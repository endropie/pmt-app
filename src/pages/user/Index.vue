<template>
  <q-page padding>
    <!-- Banner -->
    <div class="relative bg-primary-lighten p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      <div class="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true"></div>
      <div class="relative">
        <h1 class="text-2xl md:text-3xl text-slate-800 font-bold mb-1">Good afternoon, Acme Inc. 👋</h1>
        <p>Here is what’s happening with your projects today:</p>
      </div>
    </div>

    <div class="flex">
      <div class="w-full lg:w-3/5">
        <div class="mb-5">
          <h3 class="text-2xl md:text-lg text-gray-500 text-uppercase text-slate-800 font-bold mb-2">Agency Access</h3>

          <user-access-abilities />

        </div>

        <div class="mb-5">
          <h3 class="text-2xl md:text-lg text-gray-500 text-uppercase text-slate-800 font-bold mb-2">Billing</h3>

          <user-invoices />
        </div>
      </div>
      <div class="w-full lg:w-2/5 mb-5 lg:pl-4">
        <h3 class="text-2xl md:text-lg text-gray-500 text-uppercase text-slate-800 font-bold mb-2">Activity</h3>
        <user-timeline></user-timeline>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserTimeline from 'src/components/UserTimeline.vue';
import UserInvoices from 'src/components/UserInvoices.vue';
import UserAccessAbilities from 'src/components/UserAccessAbilities.vue';

export default defineComponent({
  name: 'UserIndex',
  components: {
    UserAccessAbilities,
    UserTimeline,
    UserInvoices,
  },
  setup() {
    return { }
  },
});
</script>
