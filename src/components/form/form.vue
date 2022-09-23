<template>
    <div>
        <div v-for="(item, key) in form.items" :key="key">
            <Input v-if="item.type === 'text' || item.type === 'email' || item.type === 'password'" :type="item.type" :value="item.props.value" :label="item.props.label" :name="item.props.name"></Input>
            <File v-else-if="item.type === 'file'" :value="item.props.value" :label="item.props.label" :name="item.props.name"></File>
        </div>
    </div>
</template>

<script lang="ts">
    import { toRef, defineComponent } from 'vue';
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
        setup(props) {
            let form = toRef(props, 'form');
        
            form.value.items = Object.keys(form.value.fields).map((field) => {
                let props = {
                    label: form.value.labels[field],
                    value: form.value.initData[field],
                    name: field,
                };

                return {
                    props: props, // Object.assign(props, form.value.getExtraAttr(field)),
                    type: form.value.fields[field],
                };
            });
        
            return {
                form,
            };
        },
    })
</script>
