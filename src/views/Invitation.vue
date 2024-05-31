<template>
  <Modal :state="true" :showClose="false">
    <h1 class="text-2xl font-medium leading-6 text-gray-900 mb-5">
      Setup password
    </h1>
    <Form :form="form" :submit="onSubmit" submitText="Save and Login"></Form>
  </Modal>
</template>
<script setup lang="ts">
import { reactive, onMounted } from "vue";
import Modal from "../components/Modal.vue";
import Form from "../components/form/Form.vue";
import formUtil from "../utils/form.js";
import services from "../services/account";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const route = useRoute();
const router = useRouter();

let form = reactive(
  new formUtil({
    newPassword: {
      label: "Password",
      value: "",
      type: "password",
    },
    confirmPassword: {
      label: "Confirm password",
      value: "",
      type: "password",
    },
  })
);

onMounted(async () => {
  const token = route.params.token.toString();
  await services
    .verifyInvitation(token)
    .then((response: { data: { valid: boolean } }) => {
      if (response.data.valid == false) {
        router.push({ name: 'login' });
      }
    })
    .catch(() => {
      router.push({ name: 'login' });
    });
});

const onSubmit = async () => {
  form.setLoading(true);
  form.setErrors({});
  const token = route.params.token.toString();
  await services
    .invitationPasswordSetup(token, form.getFormData())
    .then(() => {
      form.reset();
      form.setLoading(false);
      toast.success("Successfully!", {
        timeout: 2000,
      });
      router.push({ name: 'login' });
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
