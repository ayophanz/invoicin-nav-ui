<template>
  <ModalComponent :state="true" :showClose="false" :dialogClass="'w-auto'">
    <div v-if="!isSent" class="rounded-md p-4">
      <h2 class="text-center text-2xl mb-2 font-semibold">Forgot password?</h2>
      <p>
        Remember your password?
        <RouterLink
          to="/login"
          class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >Sign In here</RouterLink
        >
      </p>
      <div class="flex mt-4 w-full">
        <Form :form="form" class="w-full"></Form>
      </div>
      <div class="flex justify-center items-center gap-4 my-4">
        <Button
          @click="reset"
          :disabled="form.getLoading()"
          :loading="form.getLoading()"
          moreClass="w-full !text-white !bg-gray-700 "
        >
          <Spinner v-if="form.getLoading()" class="h-4 w-auto"></Spinner>
          <span>Reset Password</span>
        </Button>
      </div>
    </div>
    <div v-else class="flex flex-col gap-y-4">
      <h2 class="text-center text-4xl">
        Check your email to reset your password
      </h2>
      <RouterLink
        to="/login"
        class="font-medium text-indigo-600 hover:text-indigo-500"
        >Sign In</RouterLink
      >
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import accountService from "../services/account";
import ModalComponent from "../components/Modal.vue";
import Form from "../components/form/Form.vue";
import formUtil from "../utils/form.js";
import Button from "../components/Button.vue";
import Spinner from "../components/Spinner.vue";

let isSent = ref(false);
let form = reactive(
  new formUtil({
    email: {
      label: "Email*",
      value: "",
      type: "email",
    },
  })
);

const reset = async () => {
  isSent.value = false;
  form.setLoading(true);
  form.setErrors({});
  await accountService
    .forgotPassword(form.getFormData())
    .then(() => {
      form.setLoading(false);
      isSent.value = true;
    })
    .catch((error) => {
      form.setLoading(false);
      form.setErrors(error);
    });
};
</script>
