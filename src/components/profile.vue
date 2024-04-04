<template>
    <div>
        <div class="sm:hidden">
            <label for="tabs" class="sr-only">Select a tab</label>
            <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
            <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
            </select>
        </div>
        <div class="hidden sm:block">
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium']" :aria-current="tab.current ? 'page' : undefined">
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

    </div>
</template>
<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import Form from './form/form.vue';
    import Spinner from './spinner.vue';
    import { useAccountStore } from '../stores/account';
    import accountService from './../services/account';
    import { useToast } from "vue-toastification";
    import formTraits from '../traits/formTraits.js';
    import { KeyIcon, UserIcon } from '@heroicons/vue/solid';

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

    const tabs = ref([
        { name: 'Profile', href: '#', icon: UserIcon, current: true },
        { name: 'Password', href: '#', icon: KeyIcon, current: false },
    ]);

    const profileTab = () => {
        const key = tabs.value.findIndex((x: { name: string; }) => x.name === 'Profile');
        return key >= 0 ? tabs.value[key].current : false;
    };

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
        console.log(me.image);
        userForm.value['image'].value = me.image;
        userForm.value['firstname'].value = me.first_name;
        userForm.value['lastname'].value = me.last_name;
        userForm.value['email'].value = me.email;
    });

    const compUserForm = computed(() => userForm);
</script>