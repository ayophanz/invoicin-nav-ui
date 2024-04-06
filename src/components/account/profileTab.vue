<template>
    <div class="mb-5">
        <p class="mt-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
    </div>
    <Form :submit="onProfileSave" :submitLoading="submitLoading" :form="compUserForm" @onchange-form="updateUserForm"></Form>
</template>
<script setup lang="ts">
    import Form from '../form/form.vue';
    import { ref, computed, onMounted } from 'vue';
    import { useAccountStore } from '../../stores/account';
    import { useToast } from "vue-toastification";
    import formTraits from '../../traits/formTraits.js';
    import accountService from '../../services/account';

    const toast = useToast();
    const accountStore = useAccountStore();
    const me = accountStore.getMe;
    let submitLoading = ref(false);
    let userForm = ref({
        image: {
            label: 'Image',
            value: [],
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

    onMounted(() => {
        userForm.value['image'].value = me.image;
        userForm.value['firstname'].value = me.first_name;
        userForm.value['lastname'].value = me.last_name;
        userForm.value['email'].value = me.email;
    });

    const updateUserForm = (value: {name: string, value: string}) => {
        userForm.value[value.name].value = value.value;
    };

    const onProfileSave = async () => {
        submitLoading.value = true;
        userForm.value['errors'] = {};
        console.log(userForm.value.image);
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
            userForm.value['errors'] = error;
            toast.error('Something went wrong!', {
                timeout: 2000
            });
        });
    };

    const compUserForm = computed(() => userForm);
</script>