import { ref } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { BookmarkAltIcon, FireIcon, HomeIcon, InboxIcon, MenuIcon, UserIcon, XIcon } from '@heroicons/vue/outline';
export default {
    components: {
        Dialog,
        DialogPanel,
        TransitionChild,
        TransitionRoot,
        BookmarkAltIcon,
        FireIcon,
        HomeIcon,
        InboxIcon,
        MenuIcon,
        UserIcon,
        XIcon
    },
    setup() {
        const user = {
            name: 'Emily Selman',
            email: 'emily.selman@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            };
            
            const navigation = [
                { name: 'Home', href: '#', icon: HomeIcon },
                { name: 'Trending', href: '#', icon: FireIcon },
                { name: 'Bookmarks', href: '#', icon: BookmarkAltIcon },
                { name: 'Messages', href: '#', icon: InboxIcon },
                { name: 'Profile', href: '#', icon: UserIcon },
            ];
            const mobileMenuOpen = ref(false);
        
        return { user, mobileMenuOpen, navigation }
    }
}