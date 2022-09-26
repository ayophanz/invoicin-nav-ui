<template>
    <div class="mb-2">
        <label v-if="label !== ''" :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <div class="mt-1 rounded-md shadow-sm w-80">
            <Filepond
                name="test"
                ref="pond"
                label-idle="Drop image here..."
                :allow-multiple="false"
                accepted-file-types="image/jpeg, image/png"
                :files="value"
                @init="handleFilePondInit"
                @addfile="onAdd"
                @removefile="onRemove"
                credits="false"
            ></Filepond>
        </div>
    </div>
  </template>

<script lang="ts">
    import { ref, toRef, defineComponent, Component, onMounted } from 'vue';
    import vueFilePond from 'vue-filepond';
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
    import 'filepond/dist/filepond.min.css';
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
    
    const Filepond = vueFilePond(
        FilePondPluginImagePreview, 
        FilePondPluginFileValidateType
    ) as Component;

    export default defineComponent({
        name: "file",
        props: {
            value: {
                type: Array,
                default: [],
            },
            name: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                default: '',
            },
        },
        components: {
            Filepond,
        },
        setup(props, { emit }) {
            const value = toRef(props, 'value');
            let pond = ref();

            const handleFilePondInit = () => {
                //console.log('file init.');
            };

            let onAdd = () => {
                if (typeof pond.value.getFiles === "function") {
                    emit('onchangeData', {name: props.name, value: pond.value.getFiles()});
                }
            };

            let onRemove = () => {
                emit('onchangeData', {name: props.name, value: []});
            };

            return {
                value,
                pond,
                handleFilePondInit,
                onAdd,
                onRemove,
            };
        },
    });
</script>