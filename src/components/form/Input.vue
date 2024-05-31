<template>
  <div class="mb-2 input-component">
    <div>
      <label
        v-if="props.label !== ''"
        :for="props.name"
        class="block text-sm font-medium text-gray-700 text-left"
        >{{ props.label }}</label
      >
      <div class="mt-1 flex flex-col">
        <input
          autocomplete="off"
          v-model="input"
          :type="props.type"
          :name="props.name"
          :id="props.name"
          :disabled="props.disabled"
          :class="[
            props.disabled
              ? 'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200'
              : '',
            props.errorMessage !== '' ? 'border-red-500' : 'border-gray-300',
          ]"
          class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span v-if="props.errorMessage !== ''" class="text-sm text-red-500">{{
          props.errorMessage
        }}</span>
      </div>
    </div>
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
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

let input = ref(props.value);

watch(props, (prop) => {
  input.value = prop.value;
});

watch(input, (value) => {
  emit("onchangeData", { name: props.name, value: value });
});
</script>
