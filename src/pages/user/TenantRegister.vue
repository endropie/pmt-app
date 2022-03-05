<template>
  <q-page padding class="">
    <q-card>
      <q-card-section>
        <h6 class="text-gray-400 text-sm mt-3 mb-3 font-bold uppercase">
          Agency Information
        </h6>
        <div class="grid grid-cols-2 gap-4 mb-3">
          <div class="col-span-2">
            <q-input filled v-model="record.name" type="text" label="Name" />
          </div>
          <div class="col-span-2">
            <q-input filled v-model="record.description" type="textarea" label="Description" />
          </div>

        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <h6 class="text-gray-400 text-sm mt-3 mb-3 font-bold uppercase">
          Contact Information
        </h6>
        <div class="grid grid-cols-12 gap-4 mb-3">

          <div class="col-span-12 sm:col-span-6">
              <q-input filled v-model="record.profile.email" type="text" label="Email" />
          </div>
          <div class="col-span-12 sm:col-span-6">
              <q-input filled v-model="record.profile.phone" type="text" label="phone" />
          </div>
          <div class="col-span-12">
            <q-input filled v-model="record.profile.street" type="text" label="Address" />
          </div>
          <div class="col-span-12 sm:col-span-6 lg:col-span-4">
              <q-input filled v-model="record.profile.city" type="text" label="City" />
          </div>
          <div class="col-span-12 sm:col-span-6 lg:col-span-4">
              <q-input filled v-model="record.profile.province" type="text" label="Province" />
          </div>
          <div class="flex flex-row col-span-12 lg:col-span-4 gap-2">
            <div class="flex-grow">
              <q-input filled v-model="record.profile.country" type="text" label="Country" />
            </div>
            <div class="flex-auto" style="max-width:100px">
              <q-input filled v-model="record.profile.postal" type="text" label="Postal" />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-actions align="right">
        <q-btn flat color="grey" label="cancel" />
        <q-btn color="positive" label="Submit" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UserIndex',
  setup() {

    const profile = {
      street: 'Jl. rawa belong No.28',
      city: 'Jakarta Barat',
      province: 'DKI Jakart',
      country: 'Indonesia',
      postal: '12345',
      phone: '081234567890',
      email: 'email@example.com',
    };

    const record = ref({
      number: '123-456-7890',
      name: 'Gradasi',
      description: null,
      profile: profile
    });

    return { record };
  },
});
</script>
