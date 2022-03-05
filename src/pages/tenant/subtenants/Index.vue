<template>
  <q-page padding>
    <user-invoices />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserInvoices from 'src/components/UserInvoices.vue';

export default defineComponent({
  name: 'SubtenantIndex',
  components: {
    UserInvoices,
  },
  setup() {

    return {};
  },
});
</script>
