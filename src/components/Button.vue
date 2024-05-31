<template>
  <button type="button" :disabled="props.disabled" :class="props.class">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    defautl: false,
  },
  class: {
    type: String,
    required: false,
    default:
      "flex justify-around items-center gap-x-1 min-w-20 disabled:opacity-75 rounded-full bg-white px-3.5 py-2 text-sm font-semibold hover:text-white hover:bg-gray-700 hover:ring-white bg-white text-gray-700 shadow-sm ring-1 ring-gray-700 transition-all",
  },
});
</script>
