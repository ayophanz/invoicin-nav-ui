<template>
    <div class="mb-5">
        <p class="mt-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
    </div>
    <Form :submit="onProfileSave" :submitLoading="submitLoading" :form="compUserForm" @onchange-form="updateUserForm"></Form>
</template>
<script setup lang="ts">
    import Form from '../form/Form.vue';
    import { ref, computed, onMounted } from 'vue';
    import { useAccountStore } from '../../stores/account.js';
    import { useToast } from 'vue-toastification';
    import formTraits from '../../traits/formTraits.js';
    import accountService from '../../services/account/index.js';
    import { storeToRefs } from 'pinia';

    const toast = useToast();
    const accountStore = useAccountStore();
    const { getMe } = storeToRefs(accountStore) as any;

    const submitLoading = ref(false);
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
        // email: {
        //     label: 'Email address*',
        //     value: '',
        //     type: 'email',
        // },
    });

    onMounted(() => {
        userForm.value['image'].value = getMe.value.image;
        userForm.value['firstname'].value = getMe.value.first_name;
        userForm.value['lastname'].value = getMe.value.last_name;
        // userForm.value['email'].value = getMe.value.email;
    });

    const updateUserForm = (value: {name: string, value: string}) => {
        userForm.value[value.name].value = value.value;
    };

    const onProfileSave = async () => {
        submitLoading.value = true;
        userForm.value['errors'] = {};
        const userFormData = formTraits.setFormData(userForm.value);
        await accountService.updateProfile(getMe.value.id, userFormData)
        .then(async () => {
            await accountService.me();
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