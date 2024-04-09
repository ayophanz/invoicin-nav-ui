<template>
  <div class="rounded-md bg-yellow-50 p-4" v-if="domLoaded">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">{{ props.notice.title }}</h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>{{ props.notice.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

  /** Imports */
  import { ref, onMounted, nextTick } from 'vue';
  import { ExclamationIcon } from '@heroicons/vue/outline';

  /** Process */
  const props = defineProps({
    notice: {
      type: Object,
      required: true,
    },
  });

  const domLoaded = ref(false);

  onMounted(async () => {
    await nextTick(() => { domLoaded.value = true; });
  });

</script>
