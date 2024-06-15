<template>
  <span
    v-if="props.image == null || props.image == ''"
    class="uppercase text-white rounded-full h-10 w-10 font-medium flex justify-center items-center"
    :style="
      props.defaultImage
        ? `background-color:${props.defaultImage.bg_color}`
        : ''
    "
    >{{ props.defaultImage ? props.defaultImage.initial : "" }}</span
  >
  <img
    v-else
    class="inline-block h-10 w-10 object-cover rounded-full"
    :src="props.image"
  />
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  defaultImage: {
    type: Object,
    required: true,
  },
});
</script>
