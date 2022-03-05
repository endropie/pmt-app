<template>
  <q-layout view="lHh Lpr lFf" class="font-inter">
    <q-header elevated :class="!$q.dark.isActive ? 'bg-primary' : 'bg-dark'">
      <q-toolbar>
        <q-icon name="account_circle" size="28px" />
        <q-toolbar-title>
          <h1 class="text-white font-bold text-lg text-uppercase">KECY - Administator</h1>
        </q-toolbar-title>

        <q-btn flat dense round :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'" aria-label="Add" @click="$q.dark.toggle()" />
        <q-btn flat dense round icon="notifications" aria-label="Add" />

        <q-btn flat dense :label="$q.screen.gt.xs ? 'Administrator' : undefined" aria-label="Account" icon="account_circle">
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle :model-value="false" label="Use Mobile Data" />
                <q-toggle :model-value="false" label="Bluetooth" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                <q-btn color="primary" label="Logout" push size="sm" to="/" v-close-popup />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserLayout',

  setup() {
    return {};
  },
});
</script>
