<template>
  <div class="mb-2 select-component">
    <div>
      <label
        v-if="label !== ''"
        :for="name"
        class="block text-sm font-medium text-gray-700"
        >{{ label }}</label
      >
      <select
        autocomplete="off"
        @change="onChange(input)"
        v-model="input"
        :id="name"
        :name="name"
        :class="errorMessage !== '' ? 'border-red-500' : 'border-gray-300'"
        class="mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
      >
        <option
          v-for="option in options"
          :value="option.id ? option.id : option.name"
        >
          {{ option.name }}
        </option>
      </select>
      <span v-if="errorMessage !== ''" class="text-sm text-red-500">{{
        errorMessage
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits(["onchangeData"]);

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  options: {
    type: Array<{ id: String; name: String }>,
    default: [],
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

let onChange = (value: string) => {
  emit("onchangeData", { name: props.name, value: value });
};
</script>
