<template>
  <q-table
    :rows="rows"
    :columns="columns"
    :grid="isGridView()"
    :rows-per-page-options="[4, 6, 10, 20]"
    @request="onRequest"
    card-container-class="grid grid-cols-1 sm:grid-cols-2 gap-2"
  >
    <template v-slot:top>
      <div class="w-full">
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:after>
            <q-btn
              outline
              dense
              size="md"
              color="primary"
              :icon="isGridView() ? 'grid_view' : 'view_list'"
              :disable="isGridView() && isGrid === false"
              @click="isGrid = !isGrid"
            />
          </template>
        </q-input>
      </div>
    </template>
    <template v-slot:item="{ row }">
      <q-card>
        <q-card-section class="flex flex-nowrap items-center q-pt-sm q-pb-none">
          <div class="text-h6 ellipsis">{{ row.name }}</div>
          <q-icon
            name="verified"
            color="blue"
            class="pl-1"
            v-if="row.verified_at"
          />
          <q-space />
          <q-chip dense class="text-overline text-uppercase"
            :class="{ 'bg-blue-200': row.type === 'tenant', 'bg-green-200': row.type === 'subtenant' }"
          >
            {{ $t(`label.type.${row.type}`) }}
          </q-chip>
        </q-card-section>
        <q-card-section horizontal class="q-pt-none">
          <q-card-section class="col-7 q-pt-xs">
            <div class="ellipsis">No : {{ row.number }}</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
            />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat color="primary" @click="submitAccess(row.type, row.id)"
            >Access</q-btn
          >
        </q-card-actions>
      </q-card>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, reactive } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import useTable from 'src/composables/table';
import { useAccessable } from 'src/composables/accessable';
import { AccessResponse } from 'src/types/auth';

export default defineComponent({
  setup() {
    const $router = useRouter();
    const $q = useQuasar();

    const state = reactive({
      isGrid: true,
      filter: '',
    });

    const columns = ref([
      { name: 'id', field: 'id', label: 'id' },
      { name: 'name', field: 'name', label: 'name' },
    ]);

    const { rows, loading, onRequest } = useTable({
      url: '/api/common/accessables',
      pagination: null,
    });

    const { access } = useAccessable();

    const submitAccess = async (type: string, id: string) => {
      const valid = await access({ type, id }) as AccessResponse;
      console.warn('valid', valid);
      if (valid.type === 'tenant') return $router.push({ path: 'agency' });
      if (valid.type === 'subtenant') return $router.push({ path: 'kiosk' });

    };

    onMounted(() => {
      onRequest();
    });

    return {
      ...toRefs(state),
      rows,
      loading,
      columns,
      onRequest,
      submitAccess,
      isGridView: () => {
        if ($q.screen.lt.sm) return true;
        return Boolean(state.isGrid);
      },
    };
  },
});
</script>
