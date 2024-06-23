<template>
  <div class="mb-2 chekcbox-component">
    <div
      :class="errorMessage !== '' ? 'border-red-500' : 'border-transparent'"
      class="border px-2 rounded-md flex h-6 items-center"
    >
      <input
        :id="name"
        :name="name"
        v-model="checkbox"
        type="checkbox"
        class="h-4 w-4 rounded cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <label
        v-if="label !== ''"
        :for="name"
        class="pl-3 cursor-pointer text-sm font-medium text-gray-900"
        >{{ label }}</label
      >
    </div>
    <span v-if="errorMessage !== ''" class="text-sm text-red-500">{{
      errorMessage
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits(["onchangeData"]);

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

let checkbox = ref(props.value);

watch(props, (prop) => {
  checkbox.value = prop.value;
});

watch(checkbox, (value) => {
  emit("onchangeData", { name: props.name, value: value });
});
</script>
