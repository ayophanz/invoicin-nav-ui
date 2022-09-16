<template>
    <div class="flex h-screen">
        <TransitionRoot as="template" :show="mobileMenuOpen">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileMenuOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </TransitionChild>
    
            <div class="fixed inset-0 flex z-40">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
                <DialogPanel class="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="absolute top-0 right-0 -mr-12 pt-4">
                    <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="mobileMenuOpen = false">
                        <span class="sr-only">Close sidebar</span>
                        <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                    </div>
                </TransitionChild>
                <div class="pt-5 pb-4">
                    <div class="flex-shrink-0 flex items-center px-4 border-b border-gray-200 pb-5">
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=black" alt="Workflow" />
                    </div>
                    <nav aria-label="Sidebar" class="mt-5">
                    <div v-for="item in navigation" :key="item.name" class="px-2 space-y-1" :class="item.name == 'More' ? '!mt-20 border-b border-gray-200 pb-3' : ''">
                        <router-link v-if="item.enabled" :to="item.href" @click="navAction(item)" class="group p-2 rounded-md flex items-center text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                            <component :is="item.icon" :class="item.classes" class="mr-4 h-6 w-6" aria-hidden="true" />
                            {{ item.name }}
                        </router-link>
                    </div>
                    </nav>
                </div>
                <div class="flex-shrink-0 flex p-4">
                    <a href="#" class="flex-shrink-0 group block" v-tooltip="user.name">
                    <div class="flex items-center">
                        <div>
                        <img class="inline-block h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
                        </div>
                        <div class="ml-3">
                        <p class="text-base font-medium text-gray-700 group-hover:text-gray-900">
                            {{ user.name }}
                        </p>
                        <p class="text-sm font-medium text-gray-500 group-hover:text-gray-700">CPA</p>
                        </div>
                    </div>
                    </a>
                </div>
                </DialogPanel>
            </TransitionChild>
            <div class="flex-shrink-0 w-14" aria-hidden="true">
                <!-- Force sidebar to shrink to fit close icon -->
            </div>
            </div>
        </Dialog>
        </TransitionRoot>
    
        <!-- Static sidebar for desktop -->
        <div class="hidden lg:flex lg:flex-shrink-0">
        <div class="flex flex-col w-20">
            <div class="flex-1 flex flex-col min-h-0 overflow-y-auto bg-white border-r border-gray-200">
            <div class="flex-1">
                <div class="py-4 flex items-center justify-center border-b border-gray-200">
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=blue" alt="Workflow" />
                </div>
                <nav aria-label="Sidebar" class="py-6 flex flex-col items-center space-y-3">
                <template v-for="item in navigation" :key="item.name">
                    <TransitionRoot
                    :show="item.enabled"
                    enter="transform transition duration-[400ms]"
                    enter-from="opacity-0 rotate-[-120deg] scale-50"
                    enter-to="opacity-100 rotate-0 scale-100"
                    leave="transform duration-200 transition ease-in-out"
                    leave-from="opacity-100 rotate-0 scale-100"
                    leave-to="opacity-0 scale-95">
                    <div class="w-full m-auto grid justify-center" :class="item.name == 'More' ? '!mt-20 border-b border-gray-200 pb-3' : ''">
                        <a :href="item.href" @click="navAction(item)" v-tooltip="item.name" :class="item.classes" class="flex items-center rounded-lg p-2 hover:text-white">
                            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                            <span class="sr-only">{{ item.name }}</span>
                        </a>
                    </div>
                    </TransitionRoot>
                </template>
                <a href="#" class="flex-shrink-0 w-full" v-tooltip="`${user.name} / CPA`">
                    <img class="block mx-auto h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
                    <div class="sr-only">
                    <p>
                        {{ user.name }}
                    </p>
                    <p>CPA</p>
                    </div>
                </a>
                </nav>
            </div>
            </div>
        </div>
        </div>
    
        <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
        <!-- Mobile top navigation -->
        <div class="lg:hidden">
            <div class="bg-white py-2 px-4 flex items-center justify-between sm:px-6 lg:px-8 border-b border-gray-200">
            <div>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=black" alt="Workflow" />
            </div>
            <div>
                <button type="button" class="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-gray-400 rounded-md text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="mobileMenuOpen = true">
                <span class="sr-only">Open sidebar</span>
                <MenuIcon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            </div>
        </div>
        </div>

        <!-- All Modal -->
        <ModalComponent :state="isOpen" :onClose="closeModal">
            <ServiceComponent v-show="modalFor === 'services'" :enabledServices="services"></ServiceComponent> <!-- All Services -->
        </ModalComponent>

    </div>
</template>
<script lang="ts">
    import { ref, defineComponent, onMounted } from 'vue';
    import { 
        Dialog, 
        DialogTitle, 
        DialogPanel, 
        TransitionChild, 
        TransitionRoot, } from '@headlessui/vue';
    import { 
        BookmarkAltIcon,
        FireIcon,
        MenuIcon,
        UserIcon,
        UsersIcon,
        XIcon,
        ClipboardCheckIcon,
        AdjustmentsIcon,
        PlusIcon,
        SaveIcon,
        ArchiveIcon,
        FolderOpenIcon,
        ShoppingCartIcon,
        DocumentReportIcon,
        LoginIcon,
    } from '@heroicons/vue/outline';
    import SessionExpiredComponent from './sessionExpired.vue';
    import ServiceComponent from '../components/service.vue';
    import ModalComponent from '../components/modal.vue';
    import accountService from '../services/account';
    import { useAccountStore } from '../stores/account';
    import router from '../router';

    export default defineComponent({
        name: 'dashboard',
        components: {
            Dialog,
            DialogTitle,
            DialogPanel,
            TransitionChild,
            TransitionRoot,
            SessionExpiredComponent,
            ServiceComponent,
            ModalComponent,
            BookmarkAltIcon,
            FireIcon,
            MenuIcon,
            UserIcon,
            UsersIcon,
            XIcon,
            ClipboardCheckIcon,
            AdjustmentsIcon,
            PlusIcon,
            SaveIcon,
            ArchiveIcon,
            FolderOpenIcon,
            ShoppingCartIcon,
            DocumentReportIcon,
            LoginIcon,
        },
        setup() {
            
            // onMounted( async () => {
            //     await accountService.me()
            //     .then((response) => {
            //         if (!response.data.has_2fa) {
            //             router.push({ name: 'twofa' });
            //         }
            //     });
            // });

            const accountStore = useAccountStore();
            const me = accountStore.getMe;

            const user = {
                name: `${me.first_name} ${me.last_name}`,
                email: me.email,
                imageUrl:
                    'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                };
                
            const servicesTemp = [
                { name: 'Customer', href: '#', classes: 'text-pink-600 hover:bg-pink-600', icon: UsersIcon, enabled: true },
                { name: 'Product', href: '#', classes: 'text-purple-600 hover:bg-purple-600', icon: ArchiveIcon, enabled: false },
                { name: 'Order', href: '#',  classes: 'text-yellow-500 hover:bg-yellow-500', icon: ShoppingCartIcon, enabled: false },
                { name: 'Invoice', href: '#', classes: 'text-green-500 hover:bg-green-500', icon: ClipboardCheckIcon, enabled: true },
                { name: 'Inventory', href: '#', classes: 'text-indigo-500 hover:bg-indigo-500', icon: FolderOpenIcon, enabled: false },
                { name: 'Report', href: '#', classes: 'text-gray-700 hover:bg-gray-700', icon: DocumentReportIcon, enabled: false },
            ];

            const navigationTemp = [
                { name: 'More', href: '#', classes: 'text-gray-400 hover:bg-gray-400', icon: PlusIcon, enabled: true  },
                { name: 'Setting', href: '#', classes: 'text-gray-400 hover:bg-gray-400', icon: AdjustmentsIcon, enabled: true },
                { name: 'Profile', href: '#', classes: 'text-gray-400 hover:bg-gray-400', icon: UserIcon, enabled: true  },
                { name: 'Logout', href: '#', classes: 'text-gray-400 hover:bg-gray-400', icon: LoginIcon, enabled: true },
            ];

            const navigation   = ref([...servicesTemp, ...navigationTemp]);
            const services     = ref(servicesTemp);

            const mobileMenuOpen    = ref(false);
            let   isOpen            = ref(false);
            let   modalFor          = ref('');

            const navAction = (item: { name: string; }) => {
                if (item.name === 'More') {
                    openModal('services');
                } else if (item.name === 'Logout') {
                    onLogout();
                }
            }

            const openModal = (type: string) => {
                isOpen.value         = true;
                modalFor.value       = type;
                mobileMenuOpen.value = false;
            }
            
            const closeModal = () => {
                isOpen.value = false;
            }

            const onLogout = () => {
                accountService.logout()
                .then((response) => {
                    //
                }).catch((error) => {
                    console.log(error);
                });
            }
        
            return { 
                user, 
                mobileMenuOpen, 
                navigation,
                services,
                isOpen,
                modalFor,
                SaveIcon,
                XIcon,
                navAction,
                closeModal,
            }
        }
    });
</script>