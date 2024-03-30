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
    </div>
</template>

<script setup lang="ts">
    import { ref, toRef, defineProps, defineEmits, onMounted, onUpdated, computed } from 'vue';
    import Input from './input.vue';
    import File from './file.vue';
    import Select from './select.vue';

    const emit = defineEmits(['onchangeForm']);

    const props = defineProps({
        form: {
            type: Object,
            required: true,
        },
    });

    let fields = ref();
    const form = toRef(props.form);

    onMounted(() => {
        fields.value = form.value;
    });

    onUpdated(() => {
        initErrors(fields);
    });

    const initErrors = (fields: any) => {
        if (fields.value.errors && Object.keys(fields.value.errors).length > 0) {
            Object.keys(fields.value.errors).forEach(function(key) {
                if (typeof fields.value[key] !== 'undefined') fields.value[key].errorMessage = fields.value.errors[key][0];
            });
        } else {
            Object.keys(fields.value).forEach(function(key) {
                delete fields.value[key].errorMessage;
            });
        }
    };

    let updateValue = (value: any) => {
        emit('onchangeForm', value);
    };

    const compFields = computed(() => fields.value);

</script>
