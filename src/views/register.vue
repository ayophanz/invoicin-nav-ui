<template>
    <ModalComponent :state="true" :onClose="false" :showClose="false">
        <form v-if="registrationStep === 'user'" @submit.prevent="onValidateUser" class="space-y-8 divide-y divide-gray-200 w-3/4 mx-auto py-5">
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h1 class="text-2xl font-medium leading-6 text-gray-900">User Information</h1>
                        <p class="mt-1 text-sm text-gray-500">Please fill the required fields.</p>
                    </div>

                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div class="sm:col-span-6">
                            <label for="photo" class="block text-sm font-medium text-gray-700">Photo</label>
                            <div class="mt-1 flex items-center">
                                <span class="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                </span>
                                <button type="button" class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add</button>
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="firstname" class="block text-sm font-medium text-gray-700">First name</label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <input type="text" name="firstname" id="firstname" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="lastname" class="block text-sm font-medium text-gray-700">Last name</label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <input type="text" name="lastname" id="lastname" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                            <div class="mt-1">
                                <input id="email" name="email" type="email" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <input type="password" name="password" id="password" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <input type="password" name="password_confirmation" id="password_confirmation" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="pt-5">
                <div class="flex justify-end">
                    <button @click="onBack('sign_in')" type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
                    <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Next</button>
                </div>
            </div>
        </form>

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
                                <button type="button" class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add</button>
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="orgType" class="block text-sm font-medium text-gray-700">Type</label>
                            <select id="orgType" name="orgType" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
                                <input id="email" name="orgEmail" type="orgEmail" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
                            <label for="photo" class="block text-sm font-medium text-gray-700">Logo</label>
                            <div class="mt-1 flex items-center">
                                <span class="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                </span>
                                <button type="button" class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add</button>
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="orgType" class="block text-sm font-medium text-gray-700">Type</label>
                            <select id="orgType" name="orgType" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
                                <input id="email" name="orgEmail" type="orgEmail" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
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

    </ModalComponent>
</template>

<script lang="ts">
    import { ref, defineComponent } from 'vue';
    import ModalComponent from '../components/modal.vue';
    import { useRouter } from 'vue-router';

    export default defineComponent({
        name: 'register',
        components: {
            ModalComponent
        },
        setup() {
            const router = useRouter();
            let registrationStep = ref('user');

            const onValidateUser = () => {
                registrationStep.value = 'organization';
            }

            const onValidateOrganization = () => {
                registrationStep.value = 'complete';
            }

            let onBack = (type: string) => {
                if (type === 'user') registrationStep.value = 'user';
                if (type === 'sign_in') router.push({ name: 'login' });
            }

            return {
                registrationStep,
                onValidateUser,
                onValidateOrganization,
                onBack,
            };
        },
    })
</script>
