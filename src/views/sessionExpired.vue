<template>
  <ModalComponent :state="true" :onClose="false" :showClose="false">
    <div class="rounded-md bg-yellow-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <ExclamationIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-yellow-800">Warning</h3>
          <div class="mt-2 text-sm text-yellow-700">
            <p>Your current login session has ended.</p>
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center gap-4 my-4">
        <button type="button" class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Keep login
        </button>
        <button type="button" class="inline-flex items-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-base font-medium text-red-400 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-text-red-500 focus:ring-offset-2">
          Logout
        </button>
      </div>
    </div>
  </ModalComponent>
  </template>
  

<script lang="ts">
     /** Imports */
    import { defineComponent } from 'vue';
    import { ExclamationIcon } from '@heroicons/vue/outline';
    import ModalComponent from '../components/modal.vue';

     /** Process */
    export default defineComponent({
        name: 'sessionExpired',
        components: {
          ModalComponent,
          ExclamationIcon,
        },
        setup() {

        }
    });
</script>