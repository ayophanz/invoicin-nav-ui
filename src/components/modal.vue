<template>
    <TransitionRoot appear :show="state" as="template">
          <Dialog as="div" @close="false" class="relative z-10">
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
                    class="relative w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  >
                    <button 
                      @click="closeModal"
                      v-show="showClose"
                      type="button" 
                      class="flex px-1 py-1 right-2 top-2 absolute focus:outline-none">
                      <XIcon class="h-6 w-6 hover:text-red-500 text-red-300" aria-hidden="true" />&nbsp;
                    </button>
                        <slot></slot>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
</template>
<script lang="ts">

    /** Imports */
    import { toRef } from 'vue';
    import { 
        Dialog,  
        DialogPanel, 
        TransitionChild, 
        TransitionRoot } from '@headlessui/vue';
    import { XIcon } from '@heroicons/vue/outline';

    /** Process */
    export default {
        name: 'ModalComponent',
        props: {
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
            }
        },
        components: {
            Dialog,  
            DialogPanel, 
            TransitionChild, 
            TransitionRoot,
            XIcon,
        },
        setup(props) {
            const state = toRef(props, 'state');
            const showClose = toRef(props, 'showClose');

            const closeModal = () => {
                props.onClose();
            };
            
            return { state, showClose, closeModal };
        },
    }
</script>