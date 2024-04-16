<template>
    <div class="mb-5">
        <p class="mt-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
    </div>
    <div class="divide-y divide-gray-900/10">
        <dl class="space-y-6 divide-y divide-gray-900/10">
        <Disclosure as="div" v-for="(address, index) in addresses" :key="index" :class="index > 0 ? 'pt-6' : ''" v-slot="{ open }">
            <div>
                <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
                    <span class="text-base font-semibold leading-7">{{ address.type }}</span>
                    <span class="ml-6 flex h-7 items-center">
                    <PlusIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                    <MinusIcon v-else class="h-6 w-6" aria-hidden="true" />
                    </span>
                </DisclosureButton>
            </div>
            <DisclosurePanel as="div" class="mt-2 pr-12">
                <Form :submit="onAddressesSave(index)" :submitLoading="submitLoading" :form="compAddressForm(index)" @onchange-form="updateAddressesForm(index, $event)"></Form>
            </DisclosurePanel>
        </Disclosure>
        </dl>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, onMounted, computed} from 'vue';
    import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
    import { MinusIcon, PlusIcon } from '@heroicons/vue/outline';
    import Form from '../form/form.vue';
    import sharedService from '../../services/shared';
    import { storeToRefs } from 'pinia';
    import { useAccountStore } from '../../stores/account';
    import accountService from '../../services/account';
    import formTraits from '../../traits/formTraits';
    import { useToast } from "vue-toastification";

    const toast = useToast();
    const accountStore = useAccountStore();
    const { getMe } = storeToRefs(accountStore) as any;
  
    const submitLoading = ref(false);
    const addresses = ref([
        {
            type: 'Billing',
            addressForm: {
                country: {
                    label: 'Country*',
                    value: '',
                    type: 'select',
                },
                stateProvince: {
                    label: 'State / Province*',
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
                address: {
                    label: 'Address*',
                    value: '',
                    type: 'text',
                },
            }
        },
        {
            type: 'Postal',
            addressForm: {
                country: {
                    label: 'Country*',
                    value: '',
                    type: 'select',
                },
                stateProvince: {
                    label: 'State / Province*',
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
                address: {
                    label: 'Address*',
                    value: '',
                    type: 'text',
                },
            }
        }
    ]) as any; 

    onMounted(() => {
        showOptons();
        showForm();
    });

    const showForm = () => {
        getMe.value.addresses.forEach((item: any) => {
            const index = addresses.value.findIndex((item2: {type: string}) => item2.type === item.address_type.name);
            if (index >= 0) {
                addresses.value[index].addressForm.country.value = item.country;
                addresses.value[index].addressForm.stateProvince.value = item.state_province;
                addresses.value[index].addressForm.city.value = item.city;
                addresses.value[index].addressForm.zipcode.value = item.zipcode;
                addresses.value[index].addressForm.address.value = item.address;
            }
        });
    };

    const showOptons = async () => {
        await sharedService.countries()
        .then((response: any) => {
            addresses.value.forEach((item: any) => {
                item.addressForm.country['options'] = response; 
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    const onAddressesSave = (index: number) => async () => {
        submitLoading.value = true;
        addresses.value[index].addressForm['errors'] = {};
        let addressFormData = formTraits.setFormData(addresses.value[index].addressForm) as any;
        addressFormData.type = addresses.value[index].type;
        await accountService.updateAddress(getMe.value.id, addressFormData)
        .then(() => {
            submitLoading.value = false;
            toast.success('Successfully Save!', {
                timeout: 2000
            });
        })
        .catch((error) => {
            submitLoading.value = false;
            addresses.value[index].addressForm['errors'] = error;
            toast.error('Something went wrong!', {
                timeout: 2000
            });
        });
    };

    const updateAddressesForm = (index: number, value: {name: string, value: string}) => {
        addresses.value[index].addressForm[value.name].value = value.value;
    };

    const compAddressForm =  computed(() => (index: number) => addresses.value[index].addressForm);
</script>