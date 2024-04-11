<template>
    <ModalComponent :state="true" :showClose="false">
        <div>
            <div class="px-4 py-5 sm:p-6 flex flex-col items-center">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Verify One Time Password</h3>
                <div class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Enter the pin code from Google Authenticator app:</p>
                </div>
                <div class="mt-5 flex gap-x-5 items-end flex-wrap w-[400px]">
                    <div class="w-[260px] sm:max-w-xs">
                        <input type="text" v-model="oneTimePassword" name="otpCode" id="otpCode" :class="Object.keys(errors).length > 0 ? '!border-red-400' : ''" class="pl-2 block h-[36px] w-full border rounded-md border-gray-400 shadow-sm sm:text-sm" />
                    </div>
                    <button @click="onVerifyOTP" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        <div class="flex">
                            <Spinner v-if="submitLoading"></Spinner>
                            Verify
                        </div>
                    </button>
                    <span v-if="Object.keys(errors).length > 0" class="text-red-400 text-sm font-semibold text-left">{{ errors[0] }}</span>
                </div>
            </div>
        </div>
    </ModalComponent>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import accountService from '../services/account';
    import ModalComponent from '../components/modal.vue';
    import Spinner from '../components/spinner.vue';
    import { useAccountStore } from '../stores/account';
    import { useRouter } from 'vue-router';

    let   oneTimePassword = ref('');
    let   errors          = ref([]);
    let   submitLoading   = ref(false);
    const router          = useRouter();

    const accountStore     = useAccountStore();
    const tempUserId       = ref(accountStore.getOtpUserId);

    const onVerifyOTP = async () => {
        submitLoading.value = true;
        await accountService.verifyOtp({ user_id: tempUserId.value, otp_code: oneTimePassword.value })
        .then((response: any) => {
            if (response.token != '') {
                accountStore.login(response.token);
                accountStore.removeOtpUserId();
                router.push({ name: 'main' });
            } else {
                console.log(response);
            }
            submitLoading.value = false;
        })
        .catch((error) => {
            submitLoading.value = false;
            errors.value = error.error.otp_code;
        });
    }
</script>