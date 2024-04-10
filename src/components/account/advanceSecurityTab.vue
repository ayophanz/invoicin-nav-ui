<template>
    <div v-if="step2fa == 1">
        <h4 class="text-center my-5 text-2xl">Set up Google Authenticator</h4>
        <div>
            <p class="text-left">Two-Factor Authentication (2FA) works by adding an additional layer of security to your account. It requires an additional login credential - beyond just the username and password - to gain account access, and getting that second credential requires access to something that belongs to you.</p>
        </div>
        <div class="text-center my-5">
            <div class="mt-3">
                <button @click="onGenerateSecret" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Generate Secret Key to Enable 2FA
                </button>
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
                <!-- <div class="w-full sm:max-w-xs text-left">
                    <input type="text" v-model="optCode" name="otpCode" id="otpCode" :class="Object.keys(errors).length > 0 ? '!border-red-400' : ''" class="pl-2 block h-[36px] w-full border rounded-md border-gray-400 shadow-sm sm:text-sm" />
                </div> -->
                <Form :submit="on2faEnable" submitText="Enable 2FA" :submitLoading="submitLoading" :form="compOtpForm" @onchange-form="updateOtpForm" class="w-[300px]"></Form>
                <!-- <button @click="on2faEnable" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Enable 2fa
                </button> -->
            </div>
            <span v-if="Object.keys(errors).length > 0" class="text-red-400 text-sm font-semibold text-left">{{ errors[0] }}</span>
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
    import formTraits from '../../traits/formTraits';
    import { useAccountStore } from '../../stores/account';
    import { storeToRefs } from 'pinia';

    const accountStore = useAccountStore();
    const { getMe } = storeToRefs(accountStore) as any;

    const qrImage = ref('');
    const step2fa = ref(1);
    const secret  = ref('');
    const errors  = ref([]);

    const submitLoading = ref(false);
    let otpForm = ref({
        optCode: {
            label: 'OTP code*',
            value: '',
            type: 'text',
        },
    });

    const onGenerateSecret = async () => {
        await accountService.generate2faSecret()
        .then(() => {
            step2fa.value = 2;
            onLoadQRcode();
        });
    }

    const onLoadQRcode = async () => {
        await accountService.genTwofaQRcode({ user_id: getMe.value.id })
        .then((response) => {
            qrImage.value = response.qr_image_url;
            secret.value = response.secret;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const on2faEnable = async () => {
        submitLoading.value = true;
        const otpFormData = formTraits.setFormData(otpForm.value);
        await accountService.enable2fa(getMe.value.id, otpFormData)
        .then(() => {
            submitLoading.value = false;
        })
        .catch(() => {
            submitLoading.value = false;
        });
    }

    const updateOtpForm = (value: {name: string, value: string}) => {
        otpForm.value[value.name].value = value.value;
    };

    const compOtpForm = computed(() => otpForm);
</script>