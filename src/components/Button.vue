<template>
  <button
    type="button"
    :disabled="props.disabled"
    :class="[
      props.class,
      props.type == 'danger'
        ? '!text-red-600 hover:!text-white !ring-red-600 hover:!bg-red-600'
        : '',
      props.moreClass,
    ]"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    required: false,
    default:
      "flex justify-center items-center gap-x-1 min-w-20 disabled:opacity-75 rounded-full bg-white px-3.5 py-2 text-sm font-semibold hover:text-white hover:bg-gray-700 hover:ring-white bg-white text-gray-700 shadow-sm ring-1 ring-gray-700 transition-all",
  },
  moreClass: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
});
</script>
