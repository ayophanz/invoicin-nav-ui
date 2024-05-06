<template>
    <div class="mb-5">
        <p class="mt-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
    </div>
    <div class="divide-y divide-gray-900/10">
        <dl class="space-y-6 divide-y divide-gray-900/10">
        <Disclosure as="div" v-for="(address, index) in addresses" :key="index" :class="index > 0 ? 'pt-6' : ''" v-slot="{ open }">
            <div>
                <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
                    <span class="text-base font-semibold leading-7">{{ address.title }}</span>
                    <span class="ml-6 flex h-7 items-center">
                    <PlusIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                    <MinusIcon v-else class="h-6 w-6" aria-hidden="true" />
                    </span>
                </DisclosureButton>
            </div>
            <DisclosurePanel as="div" class="mt-2 pr-12">
                <Form :submit="onAddressesSave(index)" :form="address.form"></Form>
            </DisclosurePanel>
        </Disclosure>
        </dl>
    </div>
</template>
  
<script setup lang="ts">
    import { onMounted, reactive } from 'vue';
    import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
    import { MinusIcon, PlusIcon } from '@heroicons/vue/outline';
    import Form from '../form/Form.vue';
    import sharedService from '../../services/shared';
    import { storeToRefs } from 'pinia';
    import { useAccountStore } from '../../stores/account';
    import accountService from '../../services/account';
    import { useToast } from "vue-toastification";
    import formUtil from '../../utils/form.js';

    const toast = useToast();
    const accountStore = useAccountStore();
    const { getMe } = storeToRefs(accountStore) as any;
  
    let formBilling = reactive(new formUtil({
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
        }
    })) as any;

    let formPostal = reactive(new formUtil({
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
        }
    })) as any;

    let addresses = [
        {form: formBilling, title: 'Billing'},
        {form: formPostal, title: 'Postal'}
    ];

    onMounted(() => {
        showOptons();
        showForm();
    });

    const showForm = () => {
        let data = {};
        getMe.value.addresses.forEach((item: any, key: number) => {
            data = {
                country:item.country,
                stateProvince: item.state_province,
                city: item.city,
                zipcode: item.zipcode,
                address: item.address,
            };
            addresses[key].form.setFormData(data); 
        });
    };

    const showOptons = async () => {
        await sharedService.countries()
        .then((response: any) => {
            addresses.forEach(item => {
                item.form.setOptions('country', response);
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    const onAddressesSave = (index: number) => async () => {
        addresses[index].form.setLoading(true);
        addresses[index].form.setErrors({});
        let data = addresses[index].form.getFormData();
        data.type = addresses[index].title;
        await accountService.updateAddress(getMe.value.id, data)
        .then(() => {
            addresses[index].form.setLoading(false);
            toast.success('Successfully Save!', {
                timeout: 2000
            });
        })
        .catch((error) => {
            addresses[index].form.setLoading(false);
            addresses[index].form.setErrors(error);
            toast.error('Something went wrong!', {
                timeout: 2000
            });
        });
    };
</script>