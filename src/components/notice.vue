<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-gray-900">
      Warning
    </h3>

    <div class="mt-2">
      <p class="text-md text-gray-500 font-bold">
        {{ noticeTitle }}
      </p>
      <p class="text-sm text-gray-500">
        {{ noticeMessage }}
      </p>
    </div>

  </div>
</template>
<script lang="ts">

  /** Imports */
  import { defineComponent } from 'vue';

  /** Process */
  export default defineComponent({
    name: 'NoticeComponent',
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
