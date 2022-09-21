
<template>
    <ModalComponent :state="true" :onClose="false" :showClose="false">
        <div class="min-h-full flex flex-col justify-center py-12">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Sign in to your account</h2>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="my-2 mx-3 text-center">
                    <span class="text-red-500">{{ errors['message'] }}</span>
                </div>
                <div class="bg-white m:rounded-lg sm:px-10">
                    <div class="my-5">
                        <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
                        <div class="mt-1">
                        <input 
                            id="email" 
                            v-model="email" 
                            name="email"
                            type="email" 
                            autocomplete="email" 
                            :class="Object.keys(errors).length > 0 ? '!border-red-400' : ''"
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div class="my-5">
                        <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
                        <div class="mt-1">
                        <input 
                            id="password" 
                            v-model="password" 
                            name="password" 
                            type="password" 
                            autocomplete="current-password" 
                            :class="Object.keys(errors).length > 0 ? '!border-red-400' : ''"
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <!-- <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
                        </div> -->

                        <div class="text-sm">
                        <a href="#" @click.prevent="forgotPassword" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
                        </div>
                    </div>

                    <div class="my-5">
                        <button type="submit" @click.prevent="onLogin" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button>
                    </div>

                    <div class="mt-6">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300" />
                        </div>
                        <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500"> Doesn't have a account? Sign up for a 14-day trial. </span>
                        </div>
                    </div>

                    <div class="mt-6 grid grid-cols-1 gap-3 justify-items-center">
                        <div>
                            <a @click.prevent="onRegister" href="#" class="text-center hover:underline hover:text-blue-400">Sign up</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </ModalComponent>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import ModalComponent from '../components/modal.vue';
import accountService from '../services/account';
import { useRouter } from 'vue-router';
import { useAccountStore } from '../stores/account';

export default defineComponent({
    name: 'login',
    components: {
        ModalComponent
    },
    setup() {
        const router = useRouter();
        let email    = ref('');
        let password = ref('');
        let errors   = ref([]);

        const onLogin = async () => {
            await accountService.login({ email: email.value, password: password.value })
            .then((response) => {
                const accountStore = useAccountStore();
                if (response.otp_required === true) {
                    accountStore.otpUserId(response.user_id)
                    accountStore.otpRequired();
                    router.push({ name: 'twofa' });
                } else if (response.otp_setup_required === true) {
                    accountStore.login(response.token);
                    accountStore.otpSetupRequired();
                    router.push({ name: 'twofa' });
                } else {
                    accountStore.login(response.token);
                    router.push({ name: 'dashboard' });
                }
            }).catch((error) => {
                errors.value = error.error;
                console.log(error.error);
            });
        }

        const forgotPassword = () => {
            router.push({ name: 'forgotPassword' });
        }

        const onRegister = () => {
            router.push({ name: 'register' });
        }

        return {
            email,
            password,
            errors,
            forgotPassword,
            onLogin,
            onRegister,
        }
    }
})
</script>
