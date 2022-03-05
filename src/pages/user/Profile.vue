<template>
  <q-page padding class="">
    <q-card>
      <q-card-section>
        <h6 class="text-gray-400 text-sm mt-3 mb-3 font-bold uppercase">
          Accout Information
        </h6>
        <div class="grid grid-cols-2 gap-4 mb-3">
          <div class="col-span-2">
            <q-input filled v-model="user.name" type="text" label="Fullname" />
          </div>
          <div class="col-span-2 lg:col-span-1">
              <q-input filled v-model="user.email" type="text" label="Email" />
          </div>
          <div class="col-span-2 lg:col-span-1">
              <q-input filled v-model="user.phone" type="text" label="phone" />
          </div>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <h6 class="text-gray-400 text-sm mt-3 mb-3 font-bold uppercase">
          Contact Information
        </h6>
        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-12">
            <q-input filled v-model="user.profile.street" type="text" label="Address" />
          </div>
          <div class="col-span-12 sm:col-span-6 lg:col-span-4">
              <q-input filled v-model="user.profile.city" type="text" label="City" />
          </div>
          <div class="col-span-12 sm:col-span-6 lg:col-span-4">
              <q-input filled v-model="user.profile.province" type="text" label="Province" />
          </div>
          <div class="flex flex-row col-span-12 lg:col-span-4 gap-2">
            <div class="flex-grow">
              <q-input filled v-model="user.profile.country" type="text" label="Country" />
            </div>
            <div class="flex-auto" style="max-width:100px">
              <q-input filled v-model="user.profile.postal" type="text" label="Postal" />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <h6 class="text-gray-400 text-sm mt-3 mb-3 font-bold uppercase">
          About Me
        </h6>
        <q-input filled v-model="user.profile.bio" type="textarea" label="Bio" />
      </q-card-section>
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
      bio: null,
      street: 'Jl. rawa belong No.28',
      city: 'Jakarta Barat',
      province: 'DKI Jakart',
      country: 'Indonesia',
      postal: '12345',
    };

    const user = ref({
      name: 'Administrator',
      phone: '081234567890',
      email: 'email@example.com',
      profile: profile
    });

    return { user };
  },
});
</script>
