<template>
    <div class="mb-2">
        <label v-if="label !== ''" :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <div class="mt-1 flex rounded-md shadow-sm">
            <input v-model="value" :type="type" :name="name" :id="name" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
    </div>
</template>

<script lang="ts">
    import { toRef, defineComponent } from 'vue';

    export default defineComponent({
        name: 'InputComponent',
        props: {
            value: {
                type: String,
                default: '',
            },
            name: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: 'text',
            },
        },
        setup(props) {
            const value = toRef(props, 'value');
            const name  = toRef(props, 'name');
            const label = toRef(props, 'label');
            const type  = toRef(props, 'type');

            return {
                value,
                name,
                label,
                type,
            };
        },
    })
</script>
