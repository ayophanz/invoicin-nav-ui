<template>
    <div class="form-component">
        <div v-for="(field, key) in compFields" :key="key">
            <Input v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'" 
                :type="field.type" 
                :value="field.value" 
                :label="field.label"
                :error-message="field.errorMessage"
                :name="`${key}`"
                @onchange-data="updateValue"></Input>
            
            <File v-else-if="field.type === 'file'" 
                :value="field.value" 
                :label="field.label" 
                :error-message="field.errorMessage"
                :name="`${key}`"
                @onchange-data="updateValue"></File>
            
            <Select v-else-if="field.type === 'select'"
                :value="field.value"
                :options="field.options"
                :label="field.label"
                :error-message="field.errorMessage"
                :name="`${key}`"
                @onchange-data="updateValue"></Select>
        </div>
        <div v-if="props.submit" class="pt-5">
            <div class="flex justify-center">
                <button @click="props.submit" :disabled="props.submitLoading !== undefined ? props.submitLoading : false " type="button" class="disabled:opacity-75 ml-3 flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <Spinner v-if="props.submitLoading"></Spinner>
                    {{ props.submitText ? props.submitText : 'Save' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onUpdated, computed } from 'vue';
    import Input from './Input.vue';
    import File from './File.vue';
    import Select from './Select.vue';
    import Spinner from '../Spinner.vue';

    const emit = defineEmits(['onchangeForm']);

    const props = defineProps({
        submit: {
            type: Function,
            required: false,
        },
        submitText: {
            type: String,
            required: false,
        },
        submitLoading: {
            type: Boolean,
            required: false,
        },
        form: {
            type: Object,
            required: true,
        },
    });

    let fields = ref(props.form);

    onUpdated(() => {
        initErrors(fields);
    });
    
    const initErrors = (fields: any) => {
        if (fields.value.errors && Object.keys(fields.value.errors).length > 0) {
            Object.keys(fields.value.errors).forEach(function(key) {
                if (typeof fields.value[key] !== 'undefined' && fields.value.errors && fields.value.errors[key]) 
                    fields.value[key].errorMessage = fields.value.errors[key][0];
            });
        } else {
            Object.keys(fields.value).forEach(function(key) {
                delete fields.value[key].errorMessage;
            });
        }
    };

    let updateValue = (value: object) => {
        emit('onchangeForm', value);
    };

    let compFields = computed(() => fields.value);
</script>
