<template>
    <div class="mb-2 select-component">
        <label v-if="label !== ''" :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <select 
            @change="onChange(input)" 
            v-model="input" 
            :id="name" 
            :name="name"
            :class="errorMessage !== '' ? 'border-red-500' : 'border-gray-300'" 
            class="mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm">
            <option v-for="option in options" :value="option.id ? option.id : option.name">{{ option.name }}</option>
        </select>
        <span v-if="errorMessage !== ''" class="text-sm text-red-500">{{ errorMessage }}</span>
    </div>
</template>

<script setup lang="ts">
    import { ref, toRef, onMounted } from 'vue';

    const emit = defineEmits(['onchangeData']);

    const props = defineProps({
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
            default: [],
        },
        errorMessage: {
            type: String,
            default: '',
        }
    });

    const value = toRef(props.value);
    let input = ref('');

    onMounted(() => {
        input.value = value.value;
    });

    let onChange = (value: string) => {
        emit('onchangeData', {name: props.name, value: value});
    };
</script>