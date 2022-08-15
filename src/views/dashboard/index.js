import { ref } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { 
    BookmarkAltIcon,
    FireIcon,
    MenuIcon,
    UserIcon,
    UsersIcon,
    XIcon,
    ClipboardCheckIcon,
    AdjustmentsIcon,
    PlusIcon } from '@heroicons/vue/outline';
export default {
    components: {
        Dialog,
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
        PlusIcon
    },
    setup() {
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
            const mobileMenuOpen = ref(false);
        
        return { user, mobileMenuOpen, navigation }
    }
}