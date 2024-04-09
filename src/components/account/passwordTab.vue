<template>
    <notice v-if="getMe.isNewPassword" :notice="warning" class="mt-5"></notice>
    <div class="mb-5">
        <p class="mt-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
    </div>
    <Form :submit="onPasswordSave" :submitLoading="submitLoading" :form="compPasswordForm" @onchange-form="updatePasswordForm"></Form>
</template>
<script setup lang="ts">
    import { ref, computed } from 'vue';
    import Form from '../form/form.vue';
    import notice from '../notice.vue';
    import accountService from '../../services/account';
    import { useAccountStore } from '../../stores/account';
    import { useToast } from "vue-toastification";
    import formTraits from '../../traits/formTraits.js';
    import { storeToRefs } from 'pinia';

    const toast = useToast();
    const accountStore = useAccountStore();
    const { getMe } = storeToRefs(accountStore) as any;

    const warning = {
        type: 'info', 
        title: 'Pending new password', 
        message: 'We sent you an email notification about your password change; please confirm.'
    };
    const submitLoading = ref(false);
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
        await accountService.updatePassword(getMe.value.id, passwordFormData)
        .then(async () => {
            await accountService.me();
            submitLoading.value = false;
            toast.success('Successfully Save!', {
                timeout: 2000
            });
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