<template>
  <ModalComponent :state="true" :showClose="false" :dialogClass="'max-w-md'">
    <div class="min-h-full flex flex-col justify-center">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
          alt="Workflow"
        />
        <h2
          class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900"
        >
          Invoicin
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="my-2 mx-3 text-center">
          <span class="text-red-500">{{ errorMessage }}</span>
        </div>
        <div class="bg-white m:rounded-lg sm:px-10">
          <Form :form="form"></Form>
          <div class="flex items-center justify-between">
            <!-- <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
                        </div> -->

            <div class="text-sm">
              <RouterLink
                to="/forgot-password"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </RouterLink>
            </div>
          </div>

          <div class="my-5">
            <Button
              @click.prevent="onLogin"
              :disabled="form.getLoading()"
              :loading="form.getLoading()"
              moreClass="w-full !text-white !bg-gray-700 "
            >
              <Spinner v-if="form.getLoading()" class="h-4 w-auto"></Spinner>
              <span>Sign in</span>
            </Button>
          </div>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">
                  Doesn't have a account? Sign up for a 14-day trial.
                </span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-1 gap-3 justify-items-center">
              <div>
                <RouterLink
                  to="/register"
                  class="text-center hover:underline hover:text-blue-400"
                  >Sign up</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalComponent>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import ModalComponent from "../components/Modal.vue";
import Spinner from "../components/Spinner.vue";
import Form from "../components/form/Form.vue";
import accountService from "../services/account";
import { useRouter } from "vue-router";
import { useAccountStore } from "../stores/account";
import { useToast } from "vue-toastification";
import formUtil from "../utils/form.ts";
import Button from "../components/Button.vue";

const toast = useToast();
const router = useRouter();

let errorMessage = ref("");
let form = reactive(
  new formUtil({
    email: {
      label: "Email",
      value: "",
      type: "email",
    },
    password: {
      label: "Password",
      value: "",
      type: "password",
    },
  })
);

const onLogin = async () => {
  errorMessage.value = "";
  form.setLoading(true);
  await accountService
    .login(form.getFormData())
    .then((response: any) => {
      const accountStore = useAccountStore();
      if (response.otp_required === true) {
        accountStore.setOtpUserId(response.user_id);
        accountStore.setOtpRequired();
        router.push({ name: "twofa" });
      } else {
        accountStore.setLogin(response.token);
        window.history.replaceState({}, "", window.location.origin);
        toast.success("Successfully!", {
          timeout: 2000,
        });
      }
    })
    .catch((error) => {
      form.setLoading(false);
      form.setErrors(error);
      errorMessage.value = error.message;
      toast.error("Something went wrong!", {
        timeout: 2000,
      });
    });
};
</script>
