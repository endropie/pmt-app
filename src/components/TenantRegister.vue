<template>
  <q-card class="flex flex-col h-full flex-nowrap">
    <q-bar dark class="py-2 text-white bg-primary">
      <q-toolbar-title class="text-center col text-weight-bold">
        {{ $tc('title.tenant.register').toUpperCase() }}
      </q-toolbar-title>
      <q-space />
      <q-btn dense flat round icon="clear" class="font-bold" v-close-popup />
    </q-bar>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      :vertical="$q.screen.lt.md"
      animated
    >
      <!-- Tenant Information -->
      <q-step
        :name="1"
        :title="$t('title.tenant.info').toUpperCase()"
        :caption="$t('message.enterYou', [$tc('label.company', 0)])"
        clas
        icon="settings"
        :done="step > 1"
      >
        <div class="grid grid-cols-2 gap-4 mb-3">
          <div class="col-span-2">
            <q-input
              filled
              v-model="record.name"
              type="text"
              :label="$t('profile.name')"
            />
          </div>
          <div class="col-span-2">
            <q-input
              filled
              v-model="record.description"
              type="textarea"
              :label="$t('profile.about')"
            />
          </div>
        </div>
      </q-step>
      <!-- Contact Information -->
      <q-step
        :name="2"
        :title="$t('title.contact').toUpperCase()"
        :caption="$t('message.enterYou', [$tc('label.contact', 0)])"
        icon="create_new_folder"
        :done="step > 2"
      >
        <h6 class="mb-3 text-sm font-bold text-gray-400 uppercase">
          {{ $tc('title.contact') }}
        </h6>
        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-12 sm:col-span-6">
            <q-input
              filled
              v-model="record.profile.email"
              type="text"
              :label="$tc('profile.email')"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <q-input
              filled
              v-model="record.profile.phone"
              type="text"
              :label="$tc('profile.phone')"
            />
          </div>
          <div class="col-span-12">
            <q-input
              filled
              v-model="record.profile.street"
              type="text"
              :label="$tc('profile.address')"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <q-input
              filled
              v-model="record.profile.subdistrict"
              type="text"
              :label="$tc('profile.subdistrict')"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <q-input
              filled
              v-model="record.profile.district"
              type="text"
              :label="$tc('profile.district')"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <q-input
              filled
              v-model="record.profile.city"
              type="text"
              :label="$tc('profile.city')"
            />
          </div>
          <div
            class="flex flex-row col-span-12 gap-2 sm:col-span-6 flex-nowrap"
          >
            <div class="flex-grow">
              <q-input
                filled
                v-model="record.profile.province"
                type="text"
                :label="$tc('profile.province')"
              />
            </div>
            <div class="flex-auto" style="max-width: 100px">
              <q-input
                filled
                v-model="record.profile.postal"
                type="text"
                :label="$tc('profile.postal')"
              />
            </div>
          </div>
        </div>
      </q-step>
      <!-- Register Submit -->
      <q-step
        :name="3"
        :title="$t('form.finish').toUpperCase()"
        :caption="$t('title.submit.agreement')"
        icon="create_new_folder"
        :done="step > 3"
      >
        <div class="mb-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque id
          velit perspiciatis, deleniti laboriosam dolore ut perferendis dolorum
          accusamus beatae quisquam corrupti ipsam temporibus impedit. Ea
          assumenda nisi eum tenetur temporibus impedit. <br /><br />
          Ea assumenda nisi eum tenetur. Ea assumenda nisi eum tenetur.
          laboriosam dolore ut perferendis dolorum accusamus beatae quisquam
          corrupti ipsam temporibus impedit. Deleniti laboriosam dolore ut
          perferendis dolorum accusamus beatae quisquam corrupti ipsam
          temporibus impedit. Ea assumenda nisi eum tenetur. Dolor sit amet
          consectetur adipisicing elit. <br /><br />
          Atque id velit perspiciatis, deleniti laboriosam dolore ut perferendis
          dolorum accusamus beatae quisquam corrupti ipsam temporibus impedit.
          Ea assumenda nisi eum tenetur.
          <br /><br />
          Deleniti laboriosam dolore ut perferendis dolorum accusamus beatae
          quisquam corrupti ipsam temporibus impedit. Ea assumenda nisi eum
          tenetur.
        </div>
        <div class="flex flex-col">
          <q-checkbox v-model="suscribe">
            <span v-html="$tm('message.pick.suscriber')" />
          </q-checkbox>
          <q-checkbox v-model="agreement">
            <span v-html="$tm('message.pick.agreement')" />
            <b>Term of Use</b> and <b>Privasi Policy</b>
          </q-checkbox>
        </div>
      </q-step>
    </q-stepper>
    <q-space />
    <q-card-actions align="right">
      <q-btn
        v-if="step > 1"
        flat
        color="primary"
        @click="stepper.previous()"
        label="Back"
        class="q-ml-sm"
      />
      <q-btn
        v-if="step < 3"
        @click="stepper.next()"
        color="primary"
        label="Continue"
      />

      <q-btn v-if="step === 3" color="positive" label="Submit" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { QStepper } from 'quasar';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SubtenantRegister',
  setup() {
    const stepper = ref(QStepper);
    const step = ref(1);

    // optional fields
    const suscribe = ref(false);
    const agreement = ref(false);

    const profile = {
      street: 'Jl. rawa belong No.28',
      subdistrict: 'Rawa Belong II',
      district: 'Rawa Belong',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postal: '12345',
      phone: '081234567890',
      email: 'email@example.com',
    };

    const record = ref({
      number: '123-456-7890',
      name: 'Gradasi',
      description: null,
      profile: profile,
    });

    return { step, stepper, suscribe, agreement, record };
  },
});
</script>
