<template>
  <div
    class="rounded-md bg-green-50 p-4"
    v-if="props.notice.type === 'success'"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <CheckCircleIcon
          class="h-5 w-5 text-green-400"
          aria-hidden="true"
        ></CheckCircleIcon>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-green-800 text-left">
          {{ props.notice.title }}
        </h3>
        <div class="mt-2 text-sm text-green-700">
          <p>{{ props.notice.message }}</p>
        </div>
      </div>
    </div>
  </div>

  <div
    class="rounded-md bg-blue-50 p-4"
    v-else-if="props.notice.type === 'info'"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <InformationCircleIcon
          class="h-5 w-5 text-blue-400"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-blue-700 text-left">
          {{ props.notice.title }}
        </h3>
        <div class="mt-2 text-sm text-blue-700">
          <p>{{ props.notice.message }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="rounded-md bg-yellow-50 p-4" v-else>
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationCircleIcon
          class="h-5 w-5 text-yellow-400"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800 text-left">
          {{ props.notice.title }}
        </h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>{{ props.notice.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
/** Imports */
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/solid";

/** Process */
const props = defineProps({
  notice: {
    type: Object,
    required: true,
  },
});

console.log(props.notice);
</script>
