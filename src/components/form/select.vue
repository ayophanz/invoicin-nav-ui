<template>
    <div class="mb-2">
        <label v-if="label !== ''" :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <select @change="onChange(input)" v-model="input" :id="name" :name="name" class="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm">
            <option v-for="option in options" :value="option.name">{{ option.value }}</option>
        </select>
    </div>
</template>

<script lang="ts">
import { ref, toRef, defineComponent, onMounted } from 'vue';

export default defineComponent({
    name: 'SelectComponent',
    props: {
        name: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
        options: {
            type: Array as () => Array<any>,
            default: [{}],
        }
    },
    setup(props, { emit }) {
        const value = toRef(props, 'value');
        let input = ref();

        onMounted(() => {
            input.value = value.value;
        });

        let onChange = (value: string) => {
            console.log(value);
            emit('onchangeData', {name: props.name, value: value});
        };

        return {
            input,
            onChange,
        };
    }
});
</script>