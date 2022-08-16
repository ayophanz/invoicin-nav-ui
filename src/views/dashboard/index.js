import { ref } from 'vue';
import { 
    Dialog, 
    DialogTitle, 
    DialogPanel, 
    TransitionChild, 
    TransitionRoot } from '@headlessui/vue';
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
 } from '@heroicons/vue/outline';
import { DotsVerticalIcon } from '@heroicons/vue/solid';

export default {
    name: 'Dashboard',
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
        DotsVerticalIcon
    },
    setup() {
        /** Init vaiables */
        const user = {
            name: 'Emily Selman',
            email: 'emily.selman@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            };
            
        const navigation = [
            { name: 'Customer', href: '#', icon: UsersIcon },
            { name: 'Invoice', href: '#', icon: ClipboardCheckIcon },
            { name: 'More', href: '#', icon: PlusIcon },
            { name: 'Setting', href: '#', icon: AdjustmentsIcon },
            { name: 'Profile', href: '#', icon: UserIcon },
        ];

        const services = [
            { name: 'Customer', initials: 'Cust', href: '#', description: 'Free', bgColor: 'bg-pink-600' },
            { name: 'Product', initials: 'Prod', href: '#', description: 'Free', bgColor: 'bg-purple-600' },
            { name: 'Order', initials: 'Ord', href: '#', description: 'Upgrade', bgColor: 'bg-yellow-500' },
            { name: 'Invoice', initials: 'Invo', href: '#', description: 'Free', bgColor: 'bg-green-500' },
            { name: 'Inventory', initials: 'Inve', href: '#', description: 'Upgrade', bgColor: 'bg-indigo-500' },
        ]

        const mobileMenuOpen = ref(false);
        let   modalState     = ref(false);

        /** Functions */
        const navAction = (item) => {
            if (item.name == 'More') {
                modalState.value = true;
            }
        }
    
        /** Return data */
        return { 
            user, 
            mobileMenuOpen, 
            navigation,
            modalState,
            services,
            SaveIcon,
            XIcon,
            navAction
        }
    }
}