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
        </div>
    </div>
</template>

<script lang="ts">
    import { ref, toRef, defineComponent, onMounted } from 'vue';
    import Input from './input.vue';
    import File from './file.vue';

    export default defineComponent({
        name: 'FormComponent',
        components: {
            Input,
            File,
        },
        props: {
            form: {
                type: Object,
                required: true,
            }, 
        },
        setup(props, { emit }) {
            let fields = ref();
            const form = toRef(props, 'form');

            onMounted(() => {
                fields.value = form.value;
            });

            let updateValue = (value: string) => {
                emit("onchangeForm", value);
            };

            return {
                fields,
                updateValue,
            };
        },
    })
</script>
