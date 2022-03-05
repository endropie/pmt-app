<template>
  <q-page padding class="max-w-7xl mx-auto">
    <div class="relative bg-primary-lighten p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      <div class="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true"></div>
      <div class="relative text-primary-darken">
        <h1 class="text-2xl md:text-3xl text-slate-800 font-bold mb-1">Good afternoon, Acme Inc. 👋</h1>
        <p>Here is what’s happening with your projects today:</p>
      </div>
    </div>

    <div class="flex">
      <div class="w-full lg:w-3/5">
        <q-card class="mb-5">
          <q-card-section>
            <div class="text-h6 mb-4">Statistics Card</div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="(item, index) in stats" :key="index" class="flex flex-row flex-nowrap">
                <q-avatar class="rounded-xl" size="40px" font-size="28px" :color="String(item.brand)" text-color="white" :icon="item.icon" />
                <div class="ml-2">
                  <p class="text-xs mb-0">{{ item.name }}</p>
                  <span class="text-xl font-bold">245k</span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <div class="grid grid-cols-2 md:grid-cols-4 items-center gap-4">
          <q-card class="mb-5" v-for="(item, index) in [1, 2, 3, 4]" :key="index">
            <q-card-section>
              <q-avatar size="40px" font-size="32px" color="teal" text-color="white" icon="directions" />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="text-no-wrap">
                <p class="font-weight-semibold text-sm mb-1">Revenue</p>
                <div class="d-flex align-end flex-wrap mb-5">
                  <span class="font-weight-semibold text-2xl me-1 mb-2">$95.2k</span>
                  <span class="percentage text-xs mb-2">+12%</span>
                </div>
                <p class="text-xs mb-0">Revenue Increase</p>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="w-full lg:w-2/5 lg:pl-4">
        <q-card class="mb-5">
          <q-card-section>
            <div class="text-h6">Sales Overview</div>
          </q-card-section>
          <q-card-section>
            <div class="flex items-center mb-5">
              <!-- left -->
              <div class="w-full md:w-2/5">
                <div class="flex justify-center">
                  <q-knob
                    readonly
                    :model-value="71"
                    show-value
                    size="130px"
                    :thickness="0.22"
                    color="primary"
                    track-color="primary-light"
                    class="text-primary q-ma-md"
                  >
                    <div>
                      <div class="text-xl font-bold">171 K</div>
                      <div class="text-sm font-medium">Weekly visit</div>
                    </div>
                  </q-knob>
                </div>
              </div>
              <!-- right -->
              <div class="w-full md:w-3/5 md:pl-4">
                <div class="flex flex-row items-center">
                  <span class="flex-none pr-2">
                    <q-avatar color="primary-lighten" text-color="primary-dark" class="font-bold rounded-xl">$</q-avatar>
                  </span>
                  <span class="flex-grow">
                    <div class="text-base text-lighter">Number of Sales</div>
                    <div class="text-2xl font-semibold">IDR. 800.000</div>
                  </span>
                </div>
                <q-separator class="my-5" />
                <div class="grid grid-cols-2 items-center gap-x-2 gap-y-4">
                  <div v-for="(item, index) in ['September 2021', 'November 2021', 'Desember 2021', 'January 2022']" :key="index">
                    <div class="flex flex-row flex-nowrap items-center">
                      <!-- <q-icon name="tag" class="pr-1" /> -->
                      <div class="d-inline bg-primary rounded-full w-3 h-3 mr-2"></div>
                      <div class="text-gray-400 truncate">{{ item }}</div>
                    </div>
                    <div class="text-lg font-semibold pl-5 truncate">IDR {{ Math.floor((Math.random() * 100) + 1) * 40 }}</div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="w-full lg:w-1/2 lg:pr-2">
        <div class="mb-5">
          <user-invoices title="Invoices" />
        </div>
      </div>
      <div class="w-full lg:w-1/2 lg:pl-2">
        <div class="mb-5">
          <user-invoices title="Purchases" />
        </div>
      </div>
      <div class="w-full">
        <user-timeline title="Activity" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserInvoices from 'src/components/UserInvoices.vue';
import UserTimeline from 'src/components/UserTimeline.vue';

export default defineComponent({
  name: 'UserIndex',
  components: {
    UserInvoices,
    UserTimeline,
  },
  setup() {

    const stats = ref([
      { name: 'sales', icon: 'shopping_cart', brand: 'positive' },
      { name: 'revenue', icon: 'attach_money', brand: 'negative' },
      { name: 'kiosks', icon: 'store', brand: 'warning' },
      { name: 'members', icon: 'groups', brand: 'indigo' },
    ]);

    return {
      stats,
    };
  },
});
</script>
