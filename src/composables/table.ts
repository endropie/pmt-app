import { reactive, toRefs } from 'vue';
import { QTable, useQuasar } from 'quasar';
import { api as $api } from 'src/boot/axios';
import { ErrorResponse, TableResponse, TableState, TableProperty, TableResource } from 'src/types/utils';


export default function useTable<R = unknown>(property: TableProperty): TableResource<R> {
  const $q = useQuasar();

  const state = reactive<TableState<R>>({
    rows: [],
    loading: false,
    pagination: (property.pagination === null) ? null : {
      sortBy: '',
      descending: false,
      rowsNumber: 0,
      page: 1,
      rowsPerPage: 2,
      ...property.pagination
    }
  })

  const getRequestParams = () => {
    let params: Record<string, unknown> = ({})

    if (state.pagination !== null) {
      params = {
        page: state.pagination.page,
        limit: state.pagination.rowsPerPage,
        sort: state.pagination.sortBy,
        descending: state.pagination.descending,
        ...params
      }
    }
    return params
  }

  const onLoad = (doneFn: CallableFunction | undefined) => {

    state.loading = true;
    const params = getRequestParams()

    $api.get<TableResponse<R[]>>(property.url, { params })
      .then((response) => {

        state.rows.splice(0, state.rows.length, ...(response.data.data as typeof state.rows));

        if (state.pagination !== null && response.data.meta) {
          state.pagination.page = response.data.meta.current_page;
          state.pagination.rowsNumber = response.data.meta.total;
        }
      })
      .catch((error: ErrorResponse) => {

        console.error('[APP] TABLE LOAD', error.response || error);
        const caption = (error.response)
          ? (error.response?.data.message || error.message)
          : 'Network Errer';
        $q.notify({ message: 'RESOURCE FAILED', caption, type: 'negative' });

      })
      .finally(() => {
        if (doneFn) doneFn();
        state.loading = false;
      });
  };

  const onRequest: QTable['requestServerInteraction'] = (props): void => {
    if (state.pagination !== null && props?.pagination) {
      if (props.pagination?.page) state.pagination.page = props.pagination?.page
      if (props.pagination?.rowsPerPage) state.pagination.rowsPerPage = props.pagination?.rowsPerPage
      if (props.pagination?.sortBy) state.pagination.sortBy = props.pagination?.sortBy
      if (props.pagination?.descending) state.pagination.descending = props.pagination?.descending
    }

    onLoad(undefined)
  };


  return {
    ...toRefs(state),
    onLoad,
    onRequest,
  };
}
