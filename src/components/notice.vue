<template>
  <div class="rounded-md bg-yellow-50 p-4" v-if="domLoaded">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">{{ props.noticeTitle }}</h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>{{ props.noticeMessage }} <span v-if="props.showLogout" @click="onLogout" class="cursor-pointer hover:underline"> or Logout instead?</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

  /** Imports */
  import { ref, onMounted, nextTick, defineProps } from 'vue';
  import { ExclamationIcon } from '@heroicons/vue/outline';
  import accountService from '../services/account';

  /** Process */
  const props = defineProps({
    showLogout: {
      type: Boolean,
      required: false,
    },
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
  });

  const domLoaded = ref(false);

  const onLogout = () => {
      accountService.logout()
      .then((response) => {
          //
      }).catch((error) => {
          console.log(error);
      });
  }

  onMounted(async () => {
    await nextTick(() => { domLoaded.value = true; });
  });

</script>
