<template>
    <div class="mb-2">
        <label v-if="label !== ''" :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <div class="mt-1 rounded-md shadow-sm w-80">
            <Filepond
                name="test"
                ref="pond"
                label-idle="Drop files here..."
                v-bind:allow-multiple="false"
                accepted-file-types="image/jpeg, image/png"
                v-bind:files="value"
                v-on:init="handleFilePondInit"
            ></Filepond>
        </div>
    </div>
  </template>

<script lang="ts">
    import { toRef, defineComponent, Component } from 'vue';
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
        setup(props) {
            const value = toRef(props, 'value');
            const name  = toRef(props, 'name');
            const label = toRef(props, 'label');

            const handleFilePondInit = () => {
                console.log("FilePond has initialized");
            };

            return {
                value,
                name,
                label,
                handleFilePondInit,
            };
        },
    });
</script>