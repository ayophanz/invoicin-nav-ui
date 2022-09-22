<template>
    <div>
        <div v-for="(field, key) in fields" :key="key">
            <Text :type="field.type" :name="'test'"></Text>
        </div>
    </div>
</template>

<script lang="ts">
    import { ref, toRef, defineComponent } from 'vue';
    import Text from './text.vue';

    export default defineComponent({
        name: 'form',
        components: {
            Text,
        },
        props: {
            form: {
                type: Object,
                required: true,
            }, 
        },
        setup(props) {
            //const inputs = ['text', 'textarea', 'email', 'password'];
            let fields = ref({});
            const form = toRef(props, 'form');
            fields.value = Object.keys(form.value.fields).map((field) => {
                let props = {
                    value: form.value[field],
                    name: field,
                };

                return {
                    props: Object.assign(props, form.value.getExtraAttr(field)),
                    type: field,
                };
            });

            console.log(fields.value);
            
            return {
                fields,
            };
        },
    })
</script>
