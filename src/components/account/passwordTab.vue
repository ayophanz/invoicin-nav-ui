<template>
    <div class="mb-5">
        <p class="mt-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
    </div>
    <Form :submit="onPasswordSave" :submitLoading="submitLoading" :form="compPasswordForm" @onchange-form="updatePasswordForm"></Form>
</template>
<script setup lang="ts">
    import { ref, computed } from 'vue';
    import Form from '../form/form.vue';
    import accountService from '../../services/account';
    import { useAccountStore } from '../../stores/account';
    import { useToast } from "vue-toastification";
    import formTraits from '../../traits/formTraits.js';

    const toast = useToast();
    const accountStore = useAccountStore();
    const me = accountStore.getMe;
    let submitLoading = ref(false);
    let passwordForm = ref({
        currentPassword: {
            label: 'Current password*',
            value: '',
            type: 'password',
        },
        newPassword: {
            label: 'New password*',
            value: '',
            type: 'password',
        },
        confirmPassword: {
            label: 'Confirm password*',
            value: '',
            type: 'password',
        },
    });

    const onPasswordSave = async () => {
        submitLoading.value = true;
        passwordForm.value['errors'] = {};
        const passwordFormData = formTraits.setFormData(passwordForm.value);
        await accountService.updatePassword(me.id, passwordFormData)
        .then(() => {
            submitLoading.value = false;
            toast.success('Successfully Save!', {
                timeout: 2000
            });
            accountService.logout();
        })
        .catch((error) => {
            submitLoading.value = false;
            passwordForm.value['errors'] = error;
            toast.error('Something went wrong!', {
                timeout: 2000
            });
        });
    };

    const updatePasswordForm = (value: {name: string, value: string}) => {
        passwordForm.value[value.name].value = value.value;
    };

    const compPasswordForm = computed(() => passwordForm);
</script>