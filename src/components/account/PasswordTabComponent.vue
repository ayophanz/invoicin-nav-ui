<template>
  <div class="mb-5">
    <p class="mt-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
  </div>
  <FormComponent
    :submit="onPasswordSave"
    submitText="Update & Logout"
    :form="form"
  ></FormComponent>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import FormComponent from "../form/FormComponent.vue";
import accountService from "../../services/account";
import { useToast } from "vue-toastification";
import formUtil from "../../utils/form.js";

const toast = useToast();

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
    .updatePassword(formData)
    .then(async () => {
      form.setLoading(false);
      toast.success("Successfully!", {
        timeout: 2000,
      });
      accountService.logout();
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
