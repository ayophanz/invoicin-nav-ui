<template>
    <div class="mb-2 file-component">
        <div class="px-2">
            <label v-if="label !== ''" class="block text-sm font-medium text-gray-700">{{ props.label }}</label>
            <div class="mt-1 rounded-md shadow-sm w-80">
                <Filepond
                    name="file"
                    ref="pond"
                    label-idle="Drop image here..."
                    :allow-multiple="false"
                    :accepted-file-types="['image/*']"
                    :files="props.value"
                    maxFileSize="1MB"
                    @init="handleFilePondInit"
                    @addfile="onAdd"
                    @removefile="onRemove"
                    credits="false"
                ></Filepond>
            </div>
            <span v-if="props.errorMessage !== ''" class="text-sm text-red-500">{{ props.errorMessage }}</span>
        </div>
    </div>
  </template>

<script setup lang="ts">
    import { ref, Component } from 'vue';
    import vueFilePond from 'vue-filepond';
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
    import FilepondPluginFileEncode from 'filepond-plugin-file-encode';
    import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
    import 'filepond/dist/filepond.min.css';
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
    
    const Filepond = vueFilePond(
        FilePondPluginImagePreview, 
        FilePondPluginFileValidateType,
        FilepondPluginFileEncode,
        FilePondPluginFileValidateSize,
    ) as Component;

    const emit = defineEmits(['onchangeData']);

    const props = defineProps({
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
        errorMessage: {
            type: String,
            default: '',
        }
    });

    let pond = ref();

    const handleFilePondInit = () => {
        console.log('file init.');
    };

    let onAdd = () => {
        if (typeof pond.value.getFiles === "function") {
            emit('onchangeData', {name: props.name, value: pond.value.getFiles()});
        }
    };

    let onRemove = () => {
        emit('onchangeData', {name: props.name, value: []});
    };
</script>
<style>
    .file-component .filepond--root {
        margin-bottom: 0% !important;
    }
</style>