<template>
    <div>
        <div class="sm:hidden">
            <label for="tabs" class="sr-only">Select a tab</label>
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
        <ProfileTab v-if="isProfileTab()"></ProfileTab>
        <PasswordTab v-if="isPasswordTab()"></PasswordTab>
        <AdvanceSecurityTab v-if="isAdvanceSecurityTab()"></AdvanceSecurityTab>
        <AddressTab v-if="isAddressTab()"></AddressTab>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import ProfileTab from './profileTab.vue';
    import PasswordTab from './passwordTab.vue';
    import AdvanceSecurityTab from './advanceSecurityTab.vue';
    import AddressTab from './addressTab.vue';
    import { KeyIcon, UserIcon, ShieldCheckIcon, LocationMarkerIcon } from '@heroicons/vue/solid';

    const tabs = ref([
        { name: 'Profile', href: '#', icon: UserIcon, current: true },
        { name: 'Address', href: '#', icon: LocationMarkerIcon, current: false },
        { name: 'Password', href: '#', icon: KeyIcon, current: false },
        { name: 'Advance security', href: '#', icon: ShieldCheckIcon, current: false },
    ]);

    const isProfileTab = () => {
        return mapTab('Profile');
    };

    const isPasswordTab = () => {
        return mapTab('Password');
    };

    const isAddressTab = () => {
        return mapTab('Address');
    };

    const isAdvanceSecurityTab = () => {
        return mapTab('Advance security');
    };

    const mapTab = (name: string) => {
        const key = tabs.value.findIndex((x: { name: string; }) => x.name === name);
        return key >= 0 ? tabs.value[key].current : false;
    };

    const changeTab = (currentKey: number) => {
        const key = tabs.value.findIndex((x: { current: boolean; }) => x.current === true);
        if (key >= 0 ) tabs.value[key].current = false;
        tabs.value[currentKey].current = true;
    };
</script>