<template>
  <ModalComponent :state="true" :showClose="false" :dialogClass="'w-auto'">
    <div v-if="!isSent" class="rounded-md p-4">
      <h2 class="text-center text-3xl font-semibold">Forgot your password?</h2>
      <div class="flex mt-4 w-full">
        <Form :form="form" class="w-full"></Form>
      </div>
      <div class="flex justify-center items-center gap-4 my-4">
        <button
          @click="reset"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Reset Password
        </button>
        <a @click.prevent="backToSignIn" href="#" class="hover:underline"
          >back to sign in</a
        >
      </div>
    </div>
    <div v-else class="flex flex-col gap-y-4">
      <h2 class="text-center text-4xl">
        Check your email to reset your password
      </h2>
      <a
        @click.prevent="backToSignIn"
        href="#"
        class="hover:underline text-center"
        >back to sign in</a
      >
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import accountService from "../services/account";
import ModalComponent from "../components/Modal.vue";
import { useRouter } from "vue-router";
import Form from "../components/form/Form.vue";
import formUtil from "../utils/form.js";

const router = useRouter();

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
  form.setLoading(false);
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

const backToSignIn = () => {
  router.push({ name: "login" });
};
</script>
