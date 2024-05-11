<template>
  <Notice v-if="getMe.isNewPassword" :notice="warning" class="mt-5"></Notice>
  <div class="mb-5">
    <p class="mt-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
  </div>
  <Form :submit="onPasswordSave" :form="form"></Form>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import Form from "../form/Form.vue";
import Notice from "../Notice.vue";
import accountService from "../../services/account";
import { useAccountStore } from "../../stores/account.js";
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import formUtil from "../../utils/form.js";

const toast = useToast();
const accountStore = useAccountStore();
const { getMe } = storeToRefs(accountStore) as any;

const warning = {
  type: "info",
  title: "Pending new password",
  message:
    "We sent you an email notification about your password change; please confirm.",
};

let form = reactive(
  new formUtil({
    currentPassword: {
      label: "Current password*",
      value: "",
      type: "password",
    },
    newPassword: {
      label: "New password*",
      value: "",
      type: "password",
    },
    confirmPassword: {
      label: "Confirm password*",
      value: "",
      type: "password",
    },
  })
);

const onPasswordSave = async () => {
  form.setErrors({});
  form.setLoading(true);
  const formData = form.getFormData();
  await accountService
    .updatePassword(getMe.value.id, formData)
    .then(async () => {
      await accountService.me();
      form.setLoading(false);
      toast.success("Successfully Save!", {
        timeout: 2000,
      });
    })
    .catch((error) => {
      form.setLoading(false);
      form.setErrors(error);
      toast.error("Something went wrong!", {
        timeout: 2000,
      });
    });
};
</script>
