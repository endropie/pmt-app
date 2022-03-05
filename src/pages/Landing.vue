<template>
  <q-page>
    <!-- component -->
    <div class="md:h-screen flex">
      <div class="flex w-full md:w-1/2 bg-primary i justify-around items-center">
        <div class="flex flex-col items-center md:items-start py-4">
          <h1 class="text-white font-bold text-3xl font-sans text-uppercase">
            KECY
            <span class="text-lg text-italic font-medium">:: Kerosene Agency ::</span>
          </h1>

          <p class="text-white mt-1">The Manufacture system of Korensene Agents</p>
          <!-- <button type="submit" class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button> -->
        </div>
      </div>
      <div class="md:h-screen flex w-full md:w-1/2 items-center bg-grey-1">
        <div class="w-full md:mx-0 px-6 lg:px-16 xl:px-12 flex items-center justify-center py-8">
          <authentication />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Authentication from 'src/components/Authentication.vue';
export default defineComponent({
  name: 'PageLanding',
  components: {
    Authentication,
  }
});
</script>
