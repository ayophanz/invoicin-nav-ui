<template>
  <ModalComponent :state="true" :onClose="false" :showClose="false">
    <div class="rounded-md bg-yellow-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <ExclamationIcon class="h-12 w-12 text-yellow-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-2xl font-medium text-yellow-800">Warning</h3>
          <div class="mt-2 text-xl text-yellow-700">
            <p>Your current login session has ended.</p>
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center gap-4 my-4">
        <button @click="keepLogin" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Keep me logged in
        </button>
        <button @click="logout" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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
    import accountService from '../services/account';

     /** Process */
    export default defineComponent({
        name: 'sessionExpired',
        components: {
          ModalComponent,
          ExclamationIcon,
        },
        setup() {

          const logout = () => {
            accountService.logout();
          }

          const keepLogin = () => {
            accountService.refreshToken();
          }

          return {
            logout,
            keepLogin,
          }
        }
    });
</script>