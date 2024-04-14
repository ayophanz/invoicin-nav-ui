<template>
    <div v-if="step2fa == 1">
        <h4 class="text-center my-5 text-2xl">Set up Google Authenticator</h4>
        <div>
            <p class="text-left">Two-Factor Authentication (2FA) works by adding an additional layer of security to your account. It requires an additional login credential - beyond just the username and password - to gain account access, and getting that second credential requires access to something that belongs to you.</p>
        </div>
        <div class="flex gap-x-2 items-center justify-center">
            <div>
                <a target="_blank" href="https://apps.apple.com/us/app/google-authenticator/id388497605">
                    <img :src="`${api}/storage/assets/ios_download_btn.png`" class="w-auto h-14"/>
                </a>
            </div>
            <div>
                <a target="_blank" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US">
                    <img :src="`${api}/storage/assets/android_download_btn.png`" class="w-auto h-14"/>
                </a>
            </div>
        </div>
        <div class="text-center my-5">
            <div class="mt-3">
                <button v-if="!getMe.is2faEnable" @click="onGenerateSecret" :disabled="submitLoading" type="button" class="flex m-auto items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <Spinner v-if="submitLoading"></Spinner> Generate Secret Key to Enable 2FA
                </button>
                <div v-else class="flex flex-col gap-y-2">
                    <Notice :notice="info" class="mt-5"></Notice>
                    <div v-if="disable2fa" class="mt-5 flex flex-col gap-x-5 items-center">
                        <Form :submit="on2faDisable" submitText="Revoke 2FA" :submitLoading="submitLoading" :form="compOtpForm" @onchange-form="updateOtpForm" class="w-[300px]"></Form>
                    </div>
                    <a href="#" @click="disable2faToggle()" class="text-sm text-red-700 hover:underline hover:text-red-600 text-center">
                       {{ !disable2fa ? 'Revoke 2FA' : 'Cancel' }}
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div v-else-if="step2fa == 2">
        <h4 class="text-center my-5 text-2xl">Set up Google Authenticator</h4>
        <div>
            <p class="text-center">1. Scan this QR code with your Google Authenticator App. Alternatively, you can use the code: <br><strong class="text-red-400">{{ secret }}</strong></p>
            <div v-cloak v-html="qrImage" class="flex justify-center">
            </div>
            <p class="text-center">2. Enter the pin code from Google Authenticator app:</p>
        </div>
        <div class="my-5">
            <div class="mt-5 flex flex-col gap-x-5 items-center">
                <Form :submit="on2faEnable" submitText="Enable 2FA" :submitLoading="submitLoading" :form="compOtpForm" @onchange-form="updateOtpForm" class="w-[300px]"></Form>
            </div>
        </div>
    </div>

    <div v-else>
        2fa already setup
    </div>

</template>
<script setup lang="ts">
    import { ref, computed } from 'vue';
    import accountService from '../../services/account';
    import Form from '../form/form.vue';
    import Notice from '../notice.vue';
    import formTraits from '../../traits/formTraits';
    import { useAccountStore } from '../../stores/account';
    import { storeToRefs } from 'pinia';
    import Spinner from '../spinner.vue';
    import { useToast } from 'vue-toastification';

    const api = (import.meta as any).env.VITE_API_URL;
    const toast = useToast();
    const accountStore = useAccountStore();
    const { getMe } = storeToRefs(accountStore) as any;

    const info = {
        type: 'success', 
        title: '2Fa was activated.', 
        message: 'Every time you logged in, an additional authentication was needed.'
    };

    const qrImage    = ref('');
    const step2fa    = ref(1);
    const secret     = ref('');
    const disable2fa = ref(false);

    const submitLoading = ref(false);
    let otpForm = ref({
        otpCode: {
            label: 'OTP code*',
            value: '',
            type: 'text',
        },
    });

    const onGenerateSecret = async () => {
        submitLoading.value = true;
        await accountService.generate2faSecret()
        .then(() => {
            step2fa.value = 2;
            onLoadQRcode();
        });
    }

    const onLoadQRcode = async () => {
        await accountService.genTwofaQRcode({ user_id: getMe.value.id })
        .then((response) => {
            submitLoading.value = false;
            qrImage.value = response.qr_image_url;
            secret.value = response.secret;
        })
        .catch((error) => {
            console.log(error);
            submitLoading.value = false;
        });
    }

    const on2faEnable = async () => {
        submitLoading.value = true;
        otpForm.value['errors'] = {};
        const otpFormData = formTraits.setFormData(otpForm.value);
        await accountService.enable2fa(getMe.value.id, otpFormData)
        .then(async () => {
            await accountService.me();
            submitLoading.value = false;
            step2fa.value = 2;
            toast.success('Successfully Save!', {
                timeout: 2000
            });
        })
        .catch((error) => {
            submitLoading.value = false;
            otpForm.value['errors'] = error;
            toast.error('Something went wrong!', {
                timeout: 2000
            });
        });
    }

    const on2faDisable = async () => {
        submitLoading.value = true;
        otpForm.value['errors'] = {};
        const otpFormData = formTraits.setFormData(otpForm.value);
        await accountService.disable2fa(getMe.value.id, otpFormData)
        .then(async () => {
            await accountService.me();
            submitLoading.value = false;
            step2fa.value = 1;
            toast.success('Successfully Save!', {
                timeout: 2000
            });
        })
        .catch((error) => {
            submitLoading.value = false;
            otpForm.value['errors'] = error;
            toast.error('Something went wrong!', {
                timeout: 2000
            });
        });
    }

    const disable2faToggle = () => {
        disable2fa.value = !disable2fa.value;
    };

    const updateOtpForm = (value: {name: string, value: string}) => {
        otpForm.value[value.name].value = value.value;
    };

    const compOtpForm = computed(() => otpForm);
</script>