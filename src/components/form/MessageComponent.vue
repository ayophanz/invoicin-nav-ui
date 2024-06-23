<template>
  <div class="mb-2 input-component">
    <div>
      <label
        v-if="props.label !== ''"
        :for="props.name"
        class="block text-sm font-medium text-gray-700 text-left"
        >{{ props.label }}</label
      >
      <div class="mt-1 flex flex-col" v-html="props.value"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
});
</script>
