import { ref } from 'vue';
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
 } from '@heroicons/vue/outline';
import ServiceComponent from '../../components/service.vue';
import ModalComponent from '../../components/modal.vue';

export default {
    name: 'dashboard',
    components: {
        Dialog,
        DialogTitle,
        DialogPanel,
        TransitionChild,
        TransitionRoot,
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
        ServiceComponent,
        ModalComponent,
    },
    setup() {
        const user = {
            name: 'Emily Selman',
            email: 'emily.selman@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            };
            
        let services = [
            { name: 'Customer', href: '#', icon: UsersIcon, enabled: true },
            { name: 'Product', href: '#', icon: ArchiveIcon, enabled: false },
            { name: 'Invoice', href: '#', icon: ClipboardCheckIcon, enabled: true },
        ];

        let navigation = [
            { name: 'More', href: '#', icon: PlusIcon, enabled: true  },
            { name: 'Setting', href: '#', icon: AdjustmentsIcon, enabled: true },
            { name: 'Profile', href: '#', icon: UserIcon, enabled: true  },
        ];

        navigation = ref([...services, ...navigation]);
        services = ref(services);

        const mobileMenuOpen = ref(false);
        let   isOpen         = ref(false);

        const navAction = (item) => {
            if (item.name == 'More') {
                isOpen.value         = true;
                mobileMenuOpen.value = false
            }
        }

        const closeModal = () => {
            isOpen.value = false;
        }
    
        return { 
            user, 
            mobileMenuOpen, 
            navigation,
            services,
            isOpen,
            SaveIcon,
            XIcon,
            navAction,
            closeModal,
        }
    }
}