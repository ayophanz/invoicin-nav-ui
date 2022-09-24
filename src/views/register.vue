<template>
    <Modal :state="true" :showClose="false">
        <div v-if="registrationStep === 'user'" class="form w-3/4 mx-auto py-5">
            <div class="mb-5">
                <h1 class="text-2xl font-medium leading-6 text-gray-900">User Information</h1>
                <p class="mt-1 text-sm text-gray-500">Please fill the required fields.</p>
            </div>
            <Form :form="userForm" @onchange-form="updateForm"></Form>
            <div class="pt-5">
                <div class="flex justify-end">
                    <button @click="onBack('sign_in')" type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
                    <button @click="onValidateUser" type="button" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Next</button>
                </div>
            </div>
        </div>

        <form v-if="registrationStep === 'organization'" @submit.prevent="onValidateOrganization" class="space-y-8 divide-y divide-gray-200 w-3/4 mx-auto py-5">
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h1 class="text-2xl font-medium leading-6 text-gray-900">Organization Information</h1>
                        <p class="mt-1 text-sm text-gray-500">Please fill the required fields.</p>
                    </div>

                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div class="sm:col-span-6">
                            <label for="photo" class="block text-sm font-medium text-gray-700">Logo</label>
                            <div class="mt-1 flex items-center">
                                <span class="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                </span>
                                <button type="button" class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">Add</button>
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="orgType" class="block text-sm font-medium text-gray-700">Type</label>
                            <select id="orgType" name="orgType" class="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option>Company</option>
                                <option selected>Individual</option>
                            </select>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="orgName" class="block text-sm font-medium text-gray-700">Name</label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <input type="text" name="orgName" id="orgName" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="orgEmail" class="block text-sm font-medium text-gray-700">Email address</label>
                            <div class="mt-1">
                                <input type="email" name="orgEmail" id="email" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>

                    </div>
                </div>

                <div class="pt-5">
                    <div>
                        <h2 class="text-xl font-medium leading-6 text-gray-900">Billing Address</h2>
                    </div>

                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div class="sm:col-span-6">
                            <label for="orgAddress" class="block text-sm font-medium text-gray-700">Address</label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <input type="text" name="orgAddress" id="orgAddress" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="orgCity" class="block text-sm font-medium text-gray-700">City</label>
                            <div class="mt-1">
                                <input type="text" id="orgCity" name="orgCity" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="orgZipCode" class="block text-sm font-medium text-gray-700">Zip code</label>
                            <div class="mt-1">
                                <input type="text" id="orgZipCode" name="orgZipCode" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="orgCountry" class="block text-sm font-medium text-gray-700">Country</label>
                            <select id="orgCountry" name="orgCountry" class="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option>Company</option>
                                <option selected>Individual</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>

            <div class="pt-5">
                <div class="flex justify-end">
                    <button @click="onBack('user')" type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">back</button>
                    <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Next</button>
                </div>
            </div>
        </form>

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

            let updateForm = (value: any) => {
                userForm.value[value.name].value = value.value;
            };

            return {
                userForm,
                registrationStep,
                onValidateUser,
                onValidateOrganization,
                onBack,
                updateForm,
            };
        },
    })
</script>
