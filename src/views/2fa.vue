<template>
    <ModalComponent :state="true" :showClose="false">
        <div>
            <div class="px-4 py-5 sm:p-6 flex flex-col items-center">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Verify One Time Password</h3>
                <div class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Enter the pin code from Google Authenticator app:</p>
                </div>
                <div class="mt-5 flex flex-col gap-x-5 items-center">
                    <Form :submit="onVerifyOTP" submitText="Verify" :submitLoading="submitLoading" :form="compOtpForm" @onchange-form="updateOtpForm" class="w-[300px]"></Form>
                </div>
            </div>
        </div>
    </ModalComponent>
</template>
<script setup lang="ts">
    import { ref, computed } from 'vue';
    import accountService from '../services/account';
    import ModalComponent from '../components/modal.vue';
    import Form from '../components/form/form.vue';
    import { useAccountStore } from '../stores/account';
    import { useRouter } from 'vue-router';
    import formTraits from '../traits/formTraits';
    import { storeToRefs } from 'pinia';
    import { useToast } from "vue-toastification";

    const toast            = useToast();
    const accountStore     = useAccountStore();
    const { getOtpUserId } = storeToRefs(accountStore) as any;
    const router           = useRouter();

    const submitLoading = ref(false);
    let otpForm = ref({
        otpCode: {
            label: 'OTP code*',
            value: '',
            type: 'text',
        },
    });

    const onVerifyOTP = async () => {
        submitLoading.value = true;
        otpForm.value['errors'] = {};
        const otpFormData = formTraits.setFormData(otpForm.value);
        await accountService.verifyOtp(getOtpUserId.value, otpFormData)
        .then((response: any) => {
            if (response.token != '') {
                accountStore.login(response.token);
                accountStore.removeOtpUserId();
                router.push({ name: 'main' });
                toast.success('Successfully login!', {
                    timeout: 2000
                });
            } else {
                console.log(response);
            }
            submitLoading.value = false;
        })
        .catch((error) => {
            submitLoading.value = false;
            otpForm.value['errors'] = error;
        });
    }

    const updateOtpForm = (value: {name: string, value: string}) => {
        otpForm.value[value.name].value = value.value;
    };

    const compOtpForm = computed(() => otpForm);
</script>