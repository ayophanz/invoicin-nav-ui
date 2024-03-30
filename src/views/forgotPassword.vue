<template>
  <ModalComponent :state="true" :showClose="false">
    <div v-if="!isSent" class="rounded-md p-4">
      <h2 class="text-center text-4xl">Forgot your password?</h2>
      <div class="grid justify-items-center my-10 w-1/2 mx-auto">
        <label class="text-left justify-self-start">Email</label>
        <input 
          id="email" 
          v-model="email" 
          name="email"
          type="email" 
          autocomplete="email"
          :class="Object.keys(errors).length > 0 ? '!border-red-400' : ''"
          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <span v-if="Object.keys(errors).length > 0" class="text-red-400 text-sm font-semibold text-left justify-self-start">{{ errors[0] }}</span>
        </div>
      <div class="flex justify-center items-center gap-4 my-4">
        <button @click="reset" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Reset Password
        </button>
        <a @click.prevent="backToSignIn" href="#" class="hover:underline">back to sign in</a>
      </div>
    </div>
    <div v-else class="flex flex-col gap-y-4">
      <h2 class="text-center text-4xl">Check your email to reset your password</h2>
      <a @click.prevent="backToSignIn" href="#" class="hover:underline text-center">back to sign in</a>
    </div>
  </ModalComponent>
  </template>
  

<script lang="ts">
     /** Imports */
    import { ref, defineComponent } from 'vue';
    import accountService from '../services/account';
    import ModalComponent from '../components/modal.vue';
    import { useRouter } from 'vue-router';

     /** Process */
    export default defineComponent({
        name: 'forgotPassword',
        components: {
          ModalComponent,
        },
        setup() {

          const email  = ref('');
          const router = useRouter();
          let   errors = ref([]);
          let   isSent = ref(false);

          const reset = async () => {
              isSent.value = false;
              errors.value = [];
              await accountService.forgotPassword({ email: email.value })
              .then((response) => {
                console.log(response);
                isSent.value = true;
              }).catch((error) => {
                errors.value = error.error.email;
              });
          };

          const backToSignIn = () => {
            router.push({ name: 'login' });
          };

          return {
            email,
            errors,
            isSent,
            reset,
            backToSignIn,
          }
        }
    });
</script>