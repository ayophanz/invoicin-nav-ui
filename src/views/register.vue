<template>
    <Modal :state="true" :showClose="false">
        <div v-if="registrationStep === 'user'" class="form w-3/4 mx-auto py-5">
            <div class="mb-5">
                <h1 class="text-2xl font-medium leading-6 text-gray-900">User Information</h1>
                <p class="mt-1 text-sm text-gray-500">Please fill the required fields.</p>
            </div>
            <Form :form="userForm" @onchange-form="updateUserForm"></Form>
            <div class="pt-5">
                <div class="flex justify-end">
                    <button @click="onBack('sign_in')" type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
                    <button @click="onValidateUser" type="button" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Next</button>
                </div>
            </div>
        </div>

        <div v-if="registrationStep === 'organization'" class="form w-3/4 mx-auto py-5">
            <div class="mb-5">
                <h1 class="text-2xl font-medium leading-6 text-gray-900">User Information</h1>
                <p class="mt-1 text-sm text-gray-500">Please fill the required fields.</p>
            </div>
            <Form :form="orgForm" @onchange-form="updateOrgForm"></Form>
            <div class="mt-5">
                <div class="mb-3">
                    <h2 class="text-xl font-medium leading-6 text-gray-900">Billing Address</h2>
                </div>
                <Form :form="orgBillingAddressForm" @onchange-form="updateOrgBillingAddressForm"></Form>
            </div>
            <div class="pt-5">
                <div class="flex justify-end">
                    <button @click="onBack('user')" type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
                    <button @click="onValidateOrganization" type="button" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Next</button>
                </div>
            </div>
        </div>

        <div v-if="registrationStep === 'complete'" class="space-y-8 divide-y divide-gray-200 w-3/4 mx-auto py-5">
            <div class="flex flex-col justify-center items-center">
                <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-5 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save & Complete</button>
                <div class="text-base mt-3">
                    <a href="#" @click="onBack('organization')" class="font-normal text-center hover:underline hover:text-blue-400"> back </a>
                </div>
            </div>
        </div>

    </Modal>
</template>

<script lang="ts">
    import { ref, defineComponent, watch } from 'vue';
    import Modal from '../components/modal.vue';
    import Form from '../components/form/form.vue';
    import FormUtil from '../utils/form.js';
    import { useRouter } from 'vue-router';

    export default defineComponent({
        name: 'register',
        components: {
            Form,
            Modal
        },
        setup() {
            const router = useRouter();
            let userForm = ref({
                image: {
                    label: 'Image',
                    value: null,
                    type: 'file',
                },
                firstname: {
                    label: 'First Name',
                    value: '',
                    type: 'text',
                },
                lastname: {
                    label: 'Last Name',
                    value: '',
                    type: 'text',
                },
                emailAddress: {
                    label: 'Email address',
                    value: '',
                    type: 'email',
                },
                password: {
                    label: 'Password',
                    value: '',
                    type: 'password',
                },
                confirmPassword: {
                    label: 'Confirm password',
                    value: '',
                    type: 'password',
                },
            });
            let orgForm = ref({
                logo: {
                    label: 'Logo',
                    value: null,
                    type: 'file',
                },
                Type: {
                    label: 'Type',
                    value: '',
                    type: 'select',
                },
                name: {
                    label: 'Name',
                    value: '',
                    type: 'text'
                },
                email: {
                    label: 'Email',
                    value: '',
                    type: 'email',
                }
            });
            let orgBillingAddressForm = ref({
                address: {
                    label: 'Address',
                    value: '',
                    type: 'text',
                },
                city: {
                    label: 'City',
                    value: '',
                    type: 'text',
                },
                zipcode: {
                    label: 'Zipcode',
                    value: '',
                    type: 'text',
                },
                country: {
                    label: 'Country',
                    value: '',
                    type: 'select',
                }
            });

            let registrationStep = ref('user');

            const onValidateUser = () => {
                registrationStep.value = 'organization';
            }

            const onValidateOrganization = () => {
                registrationStep.value = 'complete';
            }

            let onBack = (type: string) => {
                if (type === 'organization') registrationStep.value = 'organization';
                if (type === 'user') registrationStep.value = 'user';
                if (type === 'sign_in') router.push({ name: 'login' });
            }

            let updateUserForm = (value: any) => {
                userForm.value[value.name].value = value.value;
            };

            let updateOrgForm = (value: any) => {
                orgForm.value[value.name].value = value.value;
            };

            let updateOrgBillingAddressForm = (value: any) => {
                orgBillingAddressForm.value[value.name].value = value.value;
            };

            return {
                userForm,
                orgForm,
                orgBillingAddressForm,
                registrationStep,
                onValidateUser,
                onValidateOrganization,
                onBack,
                updateUserForm,
                updateOrgForm,
                updateOrgBillingAddressForm,
            };
        },
    })
</script>
