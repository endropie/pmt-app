<template>
  <q-card class="mb-2">
    <q-card-section class="q-pa-sm">
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
            flat
            dense
            size="18px"
            color="primary"
            icon="refresh"
            @click="onLoad()"
          />
          <q-btn
            flat
            dense
            size="18px"
            color="primary"
            :icon="isGridView() ? 'grid_view' : 'view_list'"
            :disable="isGridView() && isGrid === false"
            @click="isGrid = !isGrid"
          />
        </template>
      </q-input>
    </q-card-section>
  </q-card>
  <q-table
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :grid="isGridView()"
    :rows-per-page-options="[2, 4, 6, 10, 20]"
    @request="onRequest"
    card-container-class="grid grid-cols-1 gap-2 sm:grid-cols-2"
    table-header-class="text-lg font-inter text-uppercase"
  >
    <template v-slot:no-data>
      <q-btn
        flat
        size="xl"
        color="lighter"
        class="w-full py-6 mx-auto uppercase border-2 border-dashed"
        @click="register = true"
      >
        <!-- @click="" -->
        <div class="gap-1 text-xl font-semibold">
          <span v-html="$t('form.add')" />
          <span class="mx-1 text-secondary" v-html="$t('form.new')" />
          <span v-html="$tc('label.tenant')" />
        </div>
      </q-btn>
    </template>
    <template v-slot:body-cell-access="{ row }">
      <q-td>
        <q-btn
          dense
          flat
          color="primary"
          label="Access"
          @click="submitAccess(row.type, row.id)"
        />
      </q-td>
    </template>
    <template v-slot:item="{ row }">
      <q-card>
        <q-card-section class="flex items-center flex-nowrap q-pt-sm q-pb-none">
          <div class="text-h6 ellipsis">{{ row.name }}</div>
          <q-icon
            name="verified"
            color="blue"
            class="pl-1"
            v-if="row.verified_at"
          />
          <q-space />
          <q-chip
            dense
            class="text-overline text-uppercase"
            :class="{
              'bg-blue-200': row.type === 'tenant',
              'bg-green-200': row.type === 'subtenant',
              'bg-blue-700': row.type === 'tenant' && $q.dark.isActive,
              'bg-green-700': row.type === 'subtenant' && $q.dark.isActive,
            }"
          >
            {{ $t(`label.${row.type}`) }}
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

          <q-card-section class="flex col-5 flex-center">
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

  <q-dialog
    v-model="register"
    full-width
    :maximized="$q.screen.lt.sm"
    class="w-7xl"
  >
    <tenant-register />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, reactive } from 'vue';
import { QTableProps, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import useTable from 'src/composables/table';
import { useAccessable } from 'src/composables/accessable';
import { AccessResponse } from 'src/types/auth';
import TenantRegister from 'src/components/TenantRegister.vue';

export default defineComponent({
  components: {
    TenantRegister,
  },
  setup() {
    const $router = useRouter();
    const $q = useQuasar();

    const state = reactive({
      isGrid: true,
      filter: '',
    });

    const columns = ref<QTableProps['columns']>([
      { name: 'name', field: 'name', label: 'name', align: 'left' },
      { name: 'access', field: 'id', label: '', headerStyle: 'width:50px' },
    ]);

    const { rows, loading, onRequest, onLoad } = useTable({
      url: '/api/common/accessables',
      pagination: null,
    });

    const { access } = useAccessable();

    const submitAccess = async (type: string, id: string) => {
      const valid = (await access({ type, id })) as AccessResponse;

      if (valid.type === 'tenant') return $router.push({ path: 'distributor' });
      if (valid.type === 'subtenant') return $router.push({ path: 'agency' });

      $q.notify(`ACCESSABLE FILED [${valid.type}]`);
    };

    onMounted(() => {
      onLoad();
    });

    return {
      ...toRefs(state),
      register: ref(false),
      rows,
      loading,
      columns,
      submitAccess,
      onRequest,
      onLoad,
      isGridView: () => {
        if ($q.screen.lt.sm) return true;
        return Boolean(state.isGrid);
      },
    };
  },
});
</script>
