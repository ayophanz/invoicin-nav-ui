<template>
    <Modal :state="true" :showClose="false">
        <div v-if="registrationStep === 'user'" class="form w-[90%] mx-auto py-5">
            <div class="mb-5">
                <h1 class="text-2xl font-medium leading-6 text-gray-900">User Information</h1>
                <p class="mt-1 text-sm text-gray-500">Asterisk(*) is required fields.</p>
            </div>
            <Form :form="compUserForm" @onchange-form="updateUserForm"></Form>
            <div class="pt-5">
                <div class="flex justify-end">
                    <button @click="onBack('sign_in')" type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
                    <button @click="onValidateUser" :disabled="submitLoading" type="button" class="disabled:opacity-75 ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <Spinner v-if="submitLoading"></Spinner>
                        Next
                    </button>
                </div>
            </div>
        </div>

        <div v-if="registrationStep === 'organization'" class="form w-[90%] mx-auto py-5">
            <div class="mb-5">
                <h1 class="text-2xl font-medium leading-6 text-gray-900">Organization Information</h1>
                <p class="mt-1 text-sm text-gray-500">Asterisk(*) is required fields.</p>
            </div>
            <Form :form="compOrgForm" @onchange-form="updateOrgForm"></Form>
            <div class="mt-5">
                <div class="mb-3">
                    <h2 class="text-xl font-medium leading-6 text-gray-900">Billing Address</h2>
                </div>
                <Form :form="compOrgBillingAddressForm" @onchange-form="updateOrgBillingAddressForm"></Form>
            </div>
            <div class="pt-5">
                <div class="flex justify-end">
                    <button @click="onBack('user')" type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
                    <button @click="onValidateOrganization" :disabled="submitLoading" type="button" class="disabled:opacity-75 ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <Spinner v-if="submitLoading"></Spinner>
                        Next
                    </button>
                </div>
            </div>
        </div>

        <div v-if="registrationStep === 'complete'" class="space-y-8 divide-y divide-gray-200 w-[90%] mx-auto py-5">
            <div class="flex flex-col justify-center items-center">
                <button @click="onSaveComplete" :disabled="submitLoading" type="button" class="disabled:opacity-75 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-5 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <Spinner v-if="submitLoading"></Spinner>
                    Save & Complete</button>
                <div class="text-base mt-3">
                    <a href="#" @click="onBack('organization')" class="font-normal text-center hover:underline hover:text-blue-400"> back </a>
                </div>
            </div>
        </div>

    </Modal>
</template>

<script lang="ts">
    import { ref, defineComponent, onMounted, computed } from 'vue';
    import Modal from '../components/modal.vue';
    import Form from '../components/form/form.vue';
    import Spinner from '../components/spinner.vue';
    import registerService from '../services/register';
    import sharedService from '../services/shared';
    import formTraits from '../traits/formTraits.js';
    import { useRouter } from 'vue-router';
    import { useAccountStore } from '../stores/account';

    export default defineComponent({
        name: 'register',
        components: {
            Form,
            Spinner,
            Modal
        },
        setup() {
            const router = useRouter();
            let submitLoading = ref(false);
            let registrationStep = ref('organization');//ref('user');
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
            let orgForm = ref({
                logo: {
                    label: 'Logo',
                    value: null,
                    type: 'file',
                },
                type: {
                    label: 'Type*',
                    value: '',
                    type: 'select',
                },
                name: {
                    label: 'Name*',
                    value: '',
                    type: 'text'
                },
                orgEmail: {
                    label: 'Email*',
                    value: '',
                    type: 'email',
                }
            });
            let orgBillingAddressForm = ref({
                address: {
                    label: 'Address*',
                    value: '',
                    type: 'text',
                },
                city: {
                    label: 'City*',
                    value: '',
                    type: 'text',
                },
                zipcode: {
                    label: 'Zipcode*',
                    value: '',
                    type: 'text',
                },
                country: {
                    label: 'Country*',
                    value: '',
                    type: 'select',
                }
            });

            onMounted(() => {
                showOptons();
            });

            const showOptons = async () => {
                orgForm.value.type['options'] = [
                    {id: 'individual', name: 'Individual'},
                    {id: 'company', name: 'Company'}
                ];

                await sharedService.countries()
                .then((response: any) => {
                    orgBillingAddressForm.value.country['options'] = response;
                }).catch((error) => {
                    console.log(error);
                });
            };

            const onValidateUser = async () => {
                submitLoading.value = true;             
                userForm.value['errors'] = {};
                let formData = formTraits.setFormData(userForm.value) as any;
                formData.form_type = 'user';
                await registerService.validate(formData)
                .then(() => {
                    registrationStep.value = 'organization';
                    submitLoading.value = false; 
                }).catch((error) => {
                    console.log(error);
                    userForm.value['errors'] = error;
                    submitLoading.value = false;
                });
            }

            const onValidateOrganization = async () => {
                const orgFormData = formTraits.setFormData(orgForm.value);
                const orgBillingAddressFormData = formTraits.setFormData(orgBillingAddressForm.value);

                const formData = {
                    ...orgFormData,
                    ...orgBillingAddressFormData,
                } as any;

                submitLoading.value = true;
                orgForm.value['errors'] = {};
                orgBillingAddressForm.value['errors'] = {};

                formData.form_type = 'org';
                await registerService.validate(formData)
                .then(() => {
                    submitLoading.value = false;
                    registrationStep.value = 'complete';
                }).catch((error) => {
                    console.log(error);
                    submitLoading.value = false;
                    // orgForm.value['errors'] = error;
                });
            }

            const onSaveComplete = async () => {
                submitLoading.value = true;
                const userFormData = formTraits.setFormData(userForm.value);
                const orgFormData = formTraits.setFormData(orgForm.value);
                const orgBillingAddressFormData = formTraits.setFormData(orgBillingAddressForm.value);

                const formData = {
                    ...userFormData,
                    ...orgFormData,
                    ...orgBillingAddressFormData,
                };

                await registerService.store(formData)
                .then((response: any) => {
                    submitLoading.value = false;
                    const accountStore = useAccountStore();
                    accountStore.login(response.token);
                    router.push({ name: 'dashboard' });
                }).catch((error) => {
                    console.log(error);
                    submitLoading.value = false;
                });
            };

            const onBack = (type: string) => {
                if (type === 'organization') registrationStep.value = 'organization';
                if (type === 'user') registrationStep.value = 'user';
                if (type === 'sign_in') router.push({ name: 'login' });
            }

            const updateUserForm = (value: any) => {
                userForm.value[value.name].value = value.value;
            };

            const updateOrgForm = (value: any) => {
                orgForm.value[value.name].value = value.value;
            };

            const updateOrgBillingAddressForm = (value: any) => {
                orgBillingAddressForm.value[value.name].value = value.value;
            };

            const compUserForm = computed(() => userForm);
            const compOrgForm = computed(() => orgForm);
            const compOrgBillingAddressForm = computed(() => orgBillingAddressForm);

            return {
                compUserForm,
                compOrgForm,
                compOrgBillingAddressForm,
                registrationStep,
                submitLoading,
                onValidateUser,
                onValidateOrganization,
                onSaveComplete,
                onBack,
                updateUserForm,
                updateOrgForm,
                updateOrgBillingAddressForm,
            };
        },
    })
</script>
