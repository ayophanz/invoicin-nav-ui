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
import { useRoute } from "vue-router";

const route = useRoute();

let form = reactive(
  new formUtil({
    password: {
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
        console.log("Invalid");
      }
    })
    .catch(() => {});
});

const onSubmit = () => {};
</script>
