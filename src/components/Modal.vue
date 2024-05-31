<template>
  <TransitionRoot
    appear
    :show="props.state"
    as="template"
    name="modal"
    :initialFocus="completeButtonRef"
    v-if="domLoaded"
  >
    <Dialog as="div" @close="false" class="relative z-10 nav-container">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25"></div>
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="dialogClass"
              class="relative max-w-5xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <button
                ref="completeButtonRef"
                @click="closeModal"
                v-show="props.showClose"
                type="button"
                class="flex px-1 py-1 right-2 top-2 absolute focus:outline-none"
              >
                <XIcon
                  class="h-6 w-6 hover:text-red-500 text-red-300"
                  aria-hidden="true"
                />&nbsp;
              </button>
              <slot></slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup lang="ts">
/** Imports */
import { ref, onMounted, nextTick } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";

/** Process */
const props = defineProps({
  state: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: false,
  },
  showClose: {
    type: Boolean,
    required: false,
    default: true,
  },
  dialogClass: {
    type: String,
    required: false,
    default: "w-full",
  },
});

const completeButtonRef = ref(null);
const domLoaded = ref(false);

onMounted(async () => {
  await nextTick(() => {
    domLoaded.value = true;
  });
});

const closeModal = (e: any) => {
  props.onClose?.(e);
};
</script>
