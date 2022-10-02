<template>
    <Modal :state="true" :showClose="false">
        <div v-if="registrationStep === 'user'" class="form w-[90%] mx-auto py-5">
            <div class="mb-5">
                <h1 class="text-2xl font-medium leading-6 text-gray-900">User Information</h1>
                <p class="mt-1 text-sm text-gray-500">Please fill the required fields.</p>
            </div>
            <Form :form="compUserForm" @onchange-form="updateUserForm"></Form>
            <div class="pt-5">
                <div class="flex justify-end">
                    <button @click="onBack('sign_in')" type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
                    <button @click="onValidateUser" type="button" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Next</button>
                </div>
            </div>
        </div>

        <div v-if="registrationStep === 'organization'" class="form w-[90%] mx-auto py-5">
            <div class="mb-5">
                <h1 class="text-2xl font-medium leading-6 text-gray-900">User Information</h1>
                <p class="mt-1 text-sm text-gray-500">Please fill the required fields.</p>
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
                    <button @click="onValidateOrganization" type="button" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Next</button>
                </div>
            </div>
        </div>

        <div v-if="registrationStep === 'complete'" class="space-y-8 divide-y divide-gray-200 w-[90%] mx-auto py-5">
            <div class="flex flex-col justify-center items-center">
                <button @click="onSaveComplete" type="button" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-5 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save & Complete</button>
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
    import registerService from '../services/register';
    import sharedService from '../services/shared';
    import formTraits from '../traits/formTraits.js';
    import { useRouter } from 'vue-router';

    export default defineComponent({
        name: 'register',
        components: {
            Form,
            Modal
        },
        setup() {
            const router = useRouter();
            let registrationStep = ref('user');
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
                email: {
                    label: 'Email address',
                    value: '',
                    type: 'email',
                },
                password: {
                    label: 'Password',
                    value: '',
                    type: 'password',
                },
                password_confirmation: {
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
                type: {
                    label: 'Type',
                    value: '',
                    type: 'select',
                },
                name: {
                    label: 'Name',
                    value: '',
                    type: 'text'
                },
                orgEmail: {
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
                userForm.value['errors'] = {};
                let formData = formTraits.setFormData(userForm.value) as any;
                formData.form_type = 'user';
                await registerService.validate(formData)
                .then(() => {
                    registrationStep.value = 'organization';
                }).catch((error) => {
                    console.log(error);
                    userForm.value['errors'] = error;
                });
            }

            const onValidateOrganization = async () => {
                let isOrgSucccess = ref(false);
                orgForm.value['errors'] = {};
                let formData1 = formTraits.setFormData(orgForm.value) as any;
                formData1.form_type = 'org';
                await registerService.validate(formData1)
                .then(() => {
                    isOrgSucccess.value = true;
                }).catch((error) => {
                    orgForm.value['errors'] = error;
                });

                let isOrgBillingAddressSucccess = ref(false);
                orgBillingAddressForm.value['errors'] = {};
                let formData2 = formTraits.setFormData(orgBillingAddressForm.value) as any;
                formData2.form_type = 'orgBillingAddress';
                await registerService.validate(formData2) 
                .then(() => {
                    isOrgBillingAddressSucccess.value = true;
                }).catch((error) => {
                    orgBillingAddressForm.value['errors'] = error;
                });

                if (isOrgSucccess.value === true && isOrgBillingAddressSucccess.value === true) {
                    registrationStep.value = 'complete';
                }
            }

            const onSaveComplete = async () => {
                const userFormData = formTraits.setFormData(userForm.value);
                const orgFormData = formTraits.setFormData(orgForm.value);
                const orgBillingAddressFormData = formTraits.setFormData(orgBillingAddressForm.value);

                const formData = {
                    ...userFormData,
                    ...orgFormData,
                    ...orgBillingAddressFormData,
                };

                await registerService.store(formData)
                .then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
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
