<template>
  <div class="radio-component mb-2">
    <div class="border-0 rounded-md">
      <label
        v-if="label !== ''"
        class="block text-sm font-medium text-gray-700 text-left"
        >{{ label }}</label
      >
      <fieldset class="mt-2">
        <div
          class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0"
        >
          <div
            v-for="(option, key) in options"
            :key="key"
            class="flex items-center"
          >
            <input
              :id="key.toString()"
              :name="name"
              type="radio"
              v-model="radio"
              :value="option.value"
              :checked="option.value === radio"
              class="h-4 w-4 border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-600"
            />
            <label
              :for="key.toString()"
              class="block text-sm font-medium cursor-pointer pl-3 text-gray-900"
              >{{ option.label }}</label
            >
          </div>
        </div>
      </fieldset>
    </div>
    <span v-if="errorMessage != ''" class="text-sm text-red-500">{{
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
  options: {
    type: Array<{ value: String; label: String }>,
    default: [],
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

let radio = ref(props.value);

watch(props, (prop) => {
  radio.value = prop.value;
});

watch(radio, (value) => {
  emit("onchangeData", { name: props.name, value: value });
});
</script>
