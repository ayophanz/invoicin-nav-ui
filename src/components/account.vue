<template>
    <div>
        <div class="sm:hidden">
            <label for="tabs" class="sr-only">Select a tab</label>
            <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
            <select id="tabs" name="tabs" @change="changeTab($event?.target?.selectedIndex)" class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                <option v-for="(tab, key) in tabs" :key="key" :selected="tab.current">{{ tab.name }}</option>
            </select>
        </div>
        <div class="hidden sm:block">
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <a v-for="(tab, key) in tabs" :key="key" @click="changeTab(key)" href="javascript:;" :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium']" :aria-current="tab.current ? 'page' : undefined">
                    <component :is="tab.icon" :class="[tab.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500', '-ml-0.5 mr-2 h-5 w-5']" aria-hidden="true" />
                    <span>{{ tab.name }}</span>
                </a>
                </nav>
            </div>
        </div>

        <div v-if="profileTab()">
            <div class="mb-5">
                <p class="mt-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
            </div>
            <Form :submit="onProfileSave" :submitLoading="submitLoading" :form="compUserForm" @onchange-form="updateUserForm"></Form>
        </div>

        <div v-if="passwordTab()">
            <div class="mb-5">
                <p class="mt-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
            </div>
            <Form :submit="onPasswordSave" :submitLoading="submitLoading" :form="compPasswordForm" @onchange-form="updatePasswordForm"></Form>
        </div>

    </div>
</template>
<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import Form from './form/form.vue';
    import { useAccountStore } from '../stores/account';
    import accountService from './../services/account';
    import { useToast } from "vue-toastification";
    import formTraits from '../traits/formTraits.js';
    import { KeyIcon, UserIcon, ShieldCheckIcon } from '@heroicons/vue/solid';
    import passwordTransformer from '../transformers/passwordTransformer';

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

    const tabs = ref([
        { name: 'Profile', href: '#', icon: UserIcon, current: true },
        { name: 'Password', href: '#', icon: KeyIcon, current: false },
        { name: 'Advance security', href: '#', icon: ShieldCheckIcon, current: false },
    ]);

    const profileTab = () => {
        const key = tabs.value.findIndex((x: { name: string; }) => x.name === 'Profile');
        return key >= 0 ? tabs.value[key].current : false;
    };

    const passwordTab = () => {
        const key = tabs.value.findIndex((x: { name: string; }) => x.name === 'Password');
        return key >= 0 ? tabs.value[key].current : false;
    };

    const updateUserForm = (value: any) => {
        userForm.value[value.name].value = value.value;
    };

    const updatePasswordForm = (value: any) => {
        passwordForm.value[value.name].value = value.value;
    };

    const onProfileSave = async () => {
        submitLoading.value = true;
        userForm.value['errors'] = {};
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

    const onPasswordSave = async () => {
        submitLoading.value = true;
        passwordForm.value['errors'] = {};
        const passwordFormData = formTraits.setFormData(passwordForm.value);
        const transfomer = passwordFormData; //passwordTransformer.sendCollection([passwordFormData]);
        await accountService.updatePassword(me.id, transfomer)
        .then(() => {
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

    const changeTab = (currentKey: number) => {
        const key = tabs.value.findIndex((x: { current: boolean; }) => x.current === true);
        if (key >= 0 ) tabs.value[key].current = false;
        tabs.value[currentKey].current = true;
    };

    onMounted(() => {
        userForm.value['image'].value = me.image;
        userForm.value['firstname'].value = me.first_name;
        userForm.value['lastname'].value = me.last_name;
        userForm.value['email'].value = me.email;
    });

    const compUserForm = computed(() => userForm);

    const compPasswordForm = computed(() => passwordForm);
</script>