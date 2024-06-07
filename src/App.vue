<template>
  <div class="nav-app w-full">
    <router-view />
  </div>
</template>
<script setup lang="ts">
import "floating-vue/dist/style.css";
import "vue-toastification/dist/index.css";
import "./style.css";
import accountService from "./services/account";
import { onMounted } from "vue";

// onMounted(async () => {
//   await accountService.authCheck();
// });
</script>
