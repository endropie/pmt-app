import { reactive, toRefs } from 'vue';
import { useQuasar } from 'quasar';
import { api as $api } from 'src/boot/axios';
import { ErrorResponse, TableResponse, TableState, TableProperty, TableResource, TablePagination, TablePaginable } from 'src/types/utils';


export default function useTable<R = unknown>(property: TableProperty): TableResource<R> {
  const $q = useQuasar();

  console.warn('property', property);

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

  const getParams = (pagination?: TablePagination) => {
    let params: Record<string, unknown> = ({})
    if (state.pagination !== null) {
      pagination = pagination || state.pagination
      params = {
        page: pagination.page,
        limit: pagination.rowsPerPage,
        sort: pagination.sortBy,
        descending: pagination.descending,
        ...params
      }
    }
    return params
  }

  const onRequest = (paginable: TablePaginable | undefined, doneFn: CallableFunction | undefined) => {

    state.loading = true;
    const params = getParams(paginable?.pagination)
    console.warn('GET', property.url, params);
    $api.get<TableResponse<R[]>>(property.url, { params })
      .then((response) => {
        console.warn('RESPONSE ONREQUEST', response.data);
        // set rows of data table
        state.rows.splice(0, state.rows.length, ...(response.data.data as typeof state.rows));

        // Update local pagination object
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


  return {
    ...toRefs(state),
    onRequest,
  };
}
