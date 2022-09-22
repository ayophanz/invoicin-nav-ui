<template>
    <div :class="className">
        <label v-fi="label !== ''" :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <div class="mt-1 flex rounded-md shadow-sm">
            <input v-model="value" type="text" :name="name" :id="name" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
    </div>
</template>

<script lang="ts">
    import { toRef, defineComponent } from 'vue';

    export default defineComponent({
        name: 'text',
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
            className: {
                type: String,
                required: false,
                default: '',
            }
        },
        setup(props) {
            const value     = toRef(props, 'value');
            const name      = toRef(props, 'name');
            const label     = toRef(props, 'label');
            const className = toRef(props, 'className');

            return {
                value,
                name,
                label,
                className,
            };
        },
    })
</script>
