
<template>
    <ModalComponent :state="true" :showClose="false">
        <div class="min-h-full flex flex-col justify-center py-12">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Sign in to your account</h2>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="my-2 mx-3 text-center">
                    <span class="text-red-500">{{ errorMessage }}</span>
                </div>
                <div class="bg-white m:rounded-lg sm:px-10">
                    <Form :form="compLoginForm" @onchange-form="updateLoginForm"></Form>
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
                        <button type="submit" @click.prevent="onLogin" :disabled="submitLoading" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <Spinner v-if="submitLoading"></Spinner>
                            Sign in
                        </button>
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
<script setup lang="ts">
    import { ref, computed } from 'vue';
    import ModalComponent from '../components/Modal.vue';
    import Spinner from '../components/Spinner.vue';
    import Form from '../components/form/Form.vue';
    import accountService from '../services/account';
    import { useRouter } from 'vue-router';
    import { useAccountStore } from '../stores/account';
    import formTraits from '../traits/formTraits';
    import { useToast } from "vue-toastification";

    const toast = useToast();
    const router = useRouter();
    let errorMessage  = ref('');
    const submitLoading = ref(false);
    let loginForm = ref({
        email: {
            label: 'Email',
            value: '',
            type: 'email'
        },
        password: {
            label: 'Password',
            value: '',
            type: 'password'
        }
    });

    const onLogin = async () => {
        errorMessage.value = '';
        submitLoading.value = true;
        const formData = formTraits.setFormData(loginForm.value);
        await accountService.login(formData)
        .then((response: any) => {
            const accountStore = useAccountStore();
            if (response.otp_required === true) {
                accountStore.otpUserId(response.user_id)
                accountStore.otpRequired();
                router.push({ name: 'twofa' });
            } else {
                accountStore.login(response.token);
                window.history.replaceState({}, '', window.location.origin);
                toast.success('Successfully login!', {
                    timeout: 2000
                });
            }
        }).catch((error) => {
            submitLoading.value = false;
            loginForm.value['errors'] = error;
            errorMessage.value = error.message;
            toast.error('Something went wrong!', {
                timeout: 2000
            });
        });
    }

    const forgotPassword = () => {
        router.push({ name: 'forgotPassword' });
    }

    const onRegister = () => {
        router.push({ name: 'register' });
    }

    const updateLoginForm = (value: any) => {
        loginForm.value[value.name].value = value.value;
    };

    const compLoginForm = computed(() => loginForm);
</script>
