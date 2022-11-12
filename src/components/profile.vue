<template>
    <div>
        <div class="mb-5">
            <h1 class="text-2xl font-medium leading-6 text-gray-900">Profile</h1>
            <p class="mt-1 text-sm text-gray-500">Asterisk(*) is required fields.</p>
        </div>
        <Form :form="compUserForm" @onchange-form="updateUserForm"></Form>
        <div class="pt-5">
            <div class="flex justify-center">
                <button @click="onSave" :disabled="submitLoading" type="button" class="disabled:opacity-75 ml-3 flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <Spinner v-if="submitLoading"></Spinner>
                    Save
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { ref, defineComponent, computed, onMounted } from 'vue';
    import Form from './form/form.vue';
    import Spinner from '../components/spinner.vue';

    export default defineComponent({
        name: 'ProfileComponent',
        components: {
            Form,
            Spinner,
        },
        setup() {
            let userForm = ref({
                image: {
                    label: 'Image',
                    value: null,
                    type: 'file',
                },
                firstname: {
                    label: 'First Name*',
                    value: '',
                    type: 'text',
                },
                lastname: {
                    label: 'Last Name*',
                    value: '',
                    type: 'text',
                },
                email: {
                    label: 'Email address*',
                    value: '',
                    type: 'email',
                },
                password: {
                    label: 'Password*',
                    value: '',
                    type: 'password',
                },
                password_confirmation: {
                    label: 'Confirm password*',
                    value: '',
                    type: 'password',
                },
            });

            let submitLoading = ref(false);

            const updateUserForm = (value: any) => {
                userForm.value[value.name].value = value.value;
            };

            const onSave = () => {
                //
            };

            const compUserForm = computed(() => userForm);

            onMounted(() => {
                //
            });

            return {
                compUserForm,
                submitLoading,
                updateUserForm,
                onSave,
            };
        },
    });
</script>