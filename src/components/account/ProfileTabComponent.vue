<template>
  <div class="mb-5">
    <p class="mt-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
  </div>
  <FormComponent :submit="onProfileSave" :form="form"></FormComponent>
</template>
<script setup lang="ts">
import FormComponent from "../form/FormComponent.vue";
import { onMounted, reactive } from "vue";
import { useAccountStore } from "../../stores/account.js";
import { useToast } from "vue-toastification";
import accountService from "../../services/account";
import { storeToRefs } from "pinia";
import formUtil from "../../utils/form.js";

const toast = useToast();
const accountStore = useAccountStore();
const { getMe } = storeToRefs(accountStore) as any;

let form = reactive(
  new formUtil({
    image: {
      label: "Image",
      value: [],
      type: "file",
    },
    role: {
      label: "Role",
      value: getMe.value.roles[0],
      type: "text",
      disabled: true,
    },
    firstname: {
      label: "First Name*",
      value: "",
      type: "text",
    },
    lastname: {
      label: "Last Name*",
      value: "",
      type: "text",
    },
  })
);

onMounted(() => {
  const data = {
    image: getMe.value.image,
    firstname: getMe.value.firstname,
    lastname: getMe.value.lastname,
  };

  form.setFormData(data);
});

const onProfileSave = async () => {
  form.setErrors({});
  form.setLoading(true);
  const formData = form.getFormData();
  await accountService
    .updateProfile(formData)
    .then(async () => {
      await accountService.me();
      form.setLoading(false);
      toast.success("Successfully!", {
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
