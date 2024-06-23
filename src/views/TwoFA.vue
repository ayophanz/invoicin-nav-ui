<template>
  <ModalComponent :state="true" :showClose="false">
    <div>
      <div class="px-4 py-5 sm:p-6 flex flex-col items-center">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Verify One Time Password
        </h3>
        <div class="mt-2 max-w-xl text-sm text-gray-500">
          <p>Enter the pin code from Google Authenticator app:</p>
        </div>
        <div class="mt-5 flex flex-col gap-x-5 items-center">
          <FormComponent
            :submit="onVerifyOTP"
            submitText="Verify"
            :form="otpForm"
            class="w-[300px]"
          ></FormComponent>
        </div>
      </div>
    </div>
  </ModalComponent>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import accountService from "../services/account";
import ModalComponent from "../components/ModalComponent.vue";
import FormComponent from "../components/form/FormComponent.vue";
import { useAccountStore } from "../stores/account";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import formUtil from "../utils/form.js";

const toast = useToast();
const accountStore = useAccountStore();
const { getOtpUserId } = storeToRefs(accountStore);
const router = useRouter();

let otpForm = reactive(
  new formUtil({
    otpCode: {
      label: "OTP code*",
      value: "",
      type: "text",
    },
  })
);

const onVerifyOTP = async () => {
  otpForm.setLoading(true);
  otpForm.setErrors({});
  const otpFormData = otpForm.getFormData();
  await accountService
    .verifyOtp(getOtpUserId.value, otpFormData)
    .then((response: any) => {
      console.log(response.token);
      if (response.token) {
        accountStore.setLogin(response.token);
        accountStore.setRemoveOtpUserId();
        router.push({ name: "main" });
        toast.success("Successfully!", {
          timeout: 2000,
        });
      } else {
        console.log(response);
      }
      otpForm.setLoading(false);
    })
    .catch((error) => {
      otpForm.setLoading(false);
      otpForm.setErrors(error);
    });
};
</script>
