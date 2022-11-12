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
    import Spinner from './spinner.vue';
    import { useAccountStore } from '../stores/account';
    import accountService from './../services/account';
    import { useToast } from "vue-toastification";
    import formTraits from '../traits/formTraits.js';

    export default defineComponent({
        name: 'ProfileComponent',
        components: {
            Form,
            Spinner,
        },
        setup() {
            const toast = useToast();
            const accountStore = useAccountStore();
            const me = accountStore.getMe;
            let submitLoading = ref(false);
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
            });

            const updateUserForm = (value: any) => {
                userForm.value[value.name].value = value.value;
            };

            const onSave = async () => {
                submitLoading.value = true;
                const userFormData = formTraits.setFormData(userForm.value);
                await accountService.updateProfile(me.id, userFormData)
                .then(() => {
                    submitLoading.value = false;
                    toast.success('Successfully Save!', {
                        timeout: 2000
                    });
                })
                .catch((error) => {
                    submitLoading.value = false;
                    console.log(error);
                    toast.error('Something went wrong!', {
                        timeout: 2000
                    });
                });
            };

            onMounted(() => {
                console.log(me);
                // userForm.value['firstname'].value = me.first_name;
                userForm.value['firstname'].value = me.first_name;
                userForm.value['lastname'].value = me.last_name;
                userForm.value['email'].value = me.email;
            });

            const compUserForm = computed(() => userForm);

            return {
                compUserForm,
                submitLoading,
                updateUserForm,
                onSave,
            };
        },
    });
</script>