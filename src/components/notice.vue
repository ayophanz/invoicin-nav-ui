<template>
  <div class="rounded-md bg-yellow-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">{{ noticeTitle }}</h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>{{ noticeMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  /** Imports */
  import { defineComponent } from 'vue';
  import { ExclamationIcon } from '@heroicons/vue/outline';

  /** Process */
  export default defineComponent({
    name: 'NoticeComponent',
    components: {
      ExclamationIcon
    },
    props: {
      noticeType: {
        type: String,
        required: true,
      },
      noticeTitle: {
        type: String,
        required: true,
      },
      noticeMessage: {
        type: String,
        required: true,
      }
    },
    setup(props) {
      return {};
    } 
  });

</script>
