<template>
    <div>
        <div v-for="(field, key) in fields" :key="key">
            <Input v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'" 
                :type="field.type" 
                :value="field.value" 
                :label="field.label" 
                :name="`${key}`"
                @onchange-data="updateValue"></Input>
            
            <File v-else-if="field.type === 'file'" 
                :value="field.value" 
                :label="field.label" 
                :name="`${key}`"
                @onchange-data="updateValue"></File>
            
            <Select v-else-if="field.type === 'select'"
                :value="field.value"
                :options="field.options"
                :label="field.label"
                :name="`${key}`"
                @onchange-data="updateValue"></Select>
        </div>
    </div>
</template>

<script lang="ts">
    import { ref, toRef, defineComponent, onMounted } from 'vue';
    import Input from './input.vue';
    import File from './file.vue';
    import Select from './select.vue';

    export default defineComponent({
        name: 'FormComponent',
        components: {
            Input,
            File,
            Select,
        },
        props: {
            form: {
                type: Object,
                required: true,
            },
            errors: {
                type: Array as () => Array<any>,
                default: [],
            }
        },
        setup(props, { emit }) {
            let fields = ref();
            const form = toRef(props, 'form');

            onMounted(() => {
                fields.value = form.value;
                initErrors(fields);
            });

            const initErrors = (fields: any) => {
                if (fields.value.errors) {
                    Object.keys(fields.value).forEach(function(key) {
                        if (key !== 'errors' && typeof fields.value.errors[key] !== 'undefined') {
                            fields.value[key].errorMessage = fields.value.errors[key];
                        }
                    });
                    console.log(fields.value);
                }
            };

            let updateValue = (value: any) => {
                emit("onchangeForm", value);
            };

            return {
                fields,
                updateValue,
            };
        },
    })
</script>
