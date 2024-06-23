<template>
  <div v-if="step2fa == 1">
    <NoticeComponent
      v-if="getMe.is2faEnable"
      :notice="info"
      class="mt-5"
    ></NoticeComponent>
    <h4 class="text-center my-5 text-2xl">Set up Google Authenticator</h4>
    <div>
      <p class="text-left">
        Two-Factor Authentication (2FA) works by adding an additional layer of
        security to your account. It requires an additional login credential -
        beyond just the username and password - to gain account access, and
        getting that second credential requires access to something that belongs
        to you.
      </p>
    </div>
    <div class="flex gap-x-2 items-center justify-center">
      <div>
        <a
          target="_blank"
          href="https://apps.apple.com/us/app/google-authenticator/id388497605"
        >
          <img
            :src="`${api}/storage/assets/ios_download_btn.png`"
            class="w-auto h-14"
          />
        </a>
      </div>
      <div>
        <a
          target="_blank"
          href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US"
        >
          <img
            :src="`${api}/storage/assets/android_download_btn.png`"
            class="w-auto h-14"
          />
        </a>
      </div>
    </div>
    <div class="text-center my-5">
      <div class="mt-3 flex justify-center">
        <ButtonComponent
          v-if="!getMe.is2faEnable"
          @click="onGenerateSecret"
          :disabled="submitLoading"
        >
          <SpinnerComponent v-if="submitLoading"></SpinnerComponent> Generate
          Secret Key to Enable 2FA
        </ButtonComponent>
        <div v-else class="flex flex-col gap-y-2">
          <div
            v-if="disable2fa"
            class="mt-5 flex flex-col gap-x-5 items-center"
          >
            <FormComponent
              :submit="on2faDisable"
              submitText="Revoke 2FA"
              :form="otpForm"
              class="w-[300px]"
            ></FormComponent>
          </div>
          <a
            href="#"
            @click="disable2faToggle()"
            class="text-sm text-red-700 hover:underline hover:text-red-600 text-center"
          >
            {{ !disable2fa ? "Revoke 2FA" : "Cancel" }}
          </a>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="step2fa == 2">
    <h4 class="text-center my-5 text-2xl">Set up Google Authenticator</h4>
    <div>
      <p class="text-center">
        1. Scan this QR code with your Google Authenticator App. Alternatively,
        you can use the code: <br /><strong class="text-red-400">{{
          secret
        }}</strong>
      </p>
      <div v-cloak v-html="qrImage" class="flex justify-center"></div>
      <p class="text-center">
        2. Enter the pin code from Google Authenticator app:
      </p>
    </div>
    <div class="my-5">
      <div class="mt-5 flex flex-col gap-x-5 items-center">
        <FormComponent
          :submit="on2faEnable"
          submitText="Enable 2FA"
          :form="otpForm"
          class="w-[300px]"
        ></FormComponent>
      </div>
    </div>
  </div>

  <div v-else>2fa already setup</div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import accountService from "../../services/account";
import FormComponent from "../form/FormComponent.vue";
import NoticeComponent from "../NoticeComponent.vue";
import { useAccountStore } from "../../stores/account";
import { storeToRefs } from "pinia";
import SpinnerComponent from "../SpinnerComponent.vue";
import { useToast } from "vue-toastification";
import formUtil from "../../utils/form";
import ButtonComponent from "../ButtonComponent.vue";

const api = (import.meta as any).env.VITE_API_URL;
const toast = useToast();
const accountStore = useAccountStore();
const { getMe } = storeToRefs(accountStore);

const info = {
  type: "success",
  title: "2Fa was activated.",
  message: "Every time you sign in an additional authentication was required.",
};

const qrImage = ref("");
const step2fa = ref(1);
const secret = ref("");
const disable2fa = ref(false);

const submitLoading = ref(false);
let otpForm = reactive(
  new formUtil({
    otpCode: {
      label: "OTP code*",
      value: "",
      type: "text",
    },
  })
);

const onGenerateSecret = async () => {
  submitLoading.value = true;
  await accountService.generate2faSecret().then(() => {
    step2fa.value = 2;
    onLoadQRcode();
  });
};

const onLoadQRcode = async () => {
  await accountService
    .genTwofaQRcode({ user_id: getMe.value.id })
    .then((response: any) => {
      submitLoading.value = false;
      qrImage.value = response.qr_image_url;
      secret.value = response.secret;
    })
    .catch((error) => {
      console.log(error);
      submitLoading.value = false;
    });
};

const on2faEnable = async () => {
  otpForm.setErrors({});
  otpForm.setLoading(true);
  const otpFormData = otpForm.getFormData();
  await accountService
    .enable2fa(otpFormData)
    .then(async () => {
      await accountService.me();
      otpForm.setLoading(false);
      step2fa.value = 1;
      toast.success("Successfully!", {
        timeout: 2000,
      });
    })
    .catch((error) => {
      otpForm.setErrors(error);
      otpForm.setLoading(false);
      toast.error("Something went wrong!", {
        timeout: 2000,
      });
    });
};

const on2faDisable = async () => {
  otpForm.setErrors({});
  otpForm.setLoading(true);
  const otpFormData = otpForm.getFormData();
  await accountService
    .disable2fa(otpFormData)
    .then(async () => {
      await accountService.me();
      otpForm.setLoading(false);
      step2fa.value = 1;
      toast.success("Successfully!", {
        timeout: 2000,
      });
    })
    .catch((error) => {
      otpForm.setErrors(error);
      otpForm.setLoading(false);
      toast.error("Something went wrong!", {
        timeout: 2000,
      });
    });
};

const disable2faToggle = () => {
  disable2fa.value = !disable2fa.value;
};
</script>
