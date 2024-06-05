<template>
  <div v-if="isLoaded" class="flex w-full">
    <TransitionRoot as="template" :show="mobileMenuOpen">
      <Dialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="mobileMenuOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 flex z-40">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-4">
                  <button
                    type="button"
                    class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="mobileMenuOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="pt-5 pb-4">
                <div
                  class="flex-shrink-0 flex items-center px-4 border-b border-gray-200 pb-5"
                >
                  <img class="h-8 w-auto" :src="compLogo" alt="Workflow" />
                </div>
                <nav aria-label="Sidebar" class="mt-5">
                  <div
                    v-for="item in navigation"
                    :key="item.name"
                    class="px-2 space-y-1"
                    :class="
                      item.name == 'More'
                        ? '!mt-20 border-b border-gray-200 pb-3'
                        : ''
                    "
                  >
                    <router-link
                      v-if="item.enabled"
                      :to="item.to"
                      @click="navAction(item)"
                      class="group p-2 rounded-md flex items-center text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <component
                        :is="item.icon"
                        class="text-gray-700 hover:bg-gray-700 mr-4 h-6 w-6"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </router-link>
                  </div>
                </nav>
              </div>
              <div class="flex-shrink-0 flex p-4">
                <a href="#" class="flex-shrink-0 group block cursor-default">
                  <div class="flex items-center">
                    <div>
                      <img
                        class="inline-block h-10 w-10 object-cover rounded-full"
                        :src="getMe.image ? getMe.image[0] : ''"
                        alt=""
                      />
                    </div>
                    <div class="ml-3">
                      <p
                        class="text-base font-medium text-gray-700 group-hover:text-gray-900"
                      >
                        {{ `${getMe.first_name} ${getMe.last_name}` }}
                      </p>
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
    <div class="lg:flex lg:flex-shrink-0 w-full">
      <div class="flex flex-col w-full">
        <div
          class="flex-1 flex flex-col min-h-0 overflow-y-auto bg-white scrollbar-track-white"
        >
          <div class="flex-1">
            <div
              class="py-4 flex items-center justify-center border-b border-gray-200"
            >
              <img
                class="block mx-auto h-10 w-10 object-cover rounded-full"
                :src="compLogo"
                alt="Workflow"
              />
            </div>
            <nav
              aria-label="Sidebar"
              class="py-6 flex flex-col items-center space-y-3"
            >
              <template v-for="item in navigation" :key="item.name">
                <TransitionRoot
                  :show="item.enabled"
                  enter="transform transition duration-[400ms]"
                  enter-from="opacity-0 rotate-[-120deg] scale-50"
                  enter-to="opacity-100 rotate-0 scale-100"
                  leave="transform duration-200 transition ease-in-out"
                  leave-from="opacity-100 rotate-0 scale-100"
                  leave-to="opacity-0 scale-95"
                >
                  <div
                    class="w-full m-auto grid justify-center"
                    :class="
                      item.name == 'More'
                        ? '!mt-20 border-b border-gray-200 pb-3'
                        : ''
                    "
                  >
                    <a
                      href="javascript:;"
                      @click="navAction(item)"
                      v-tooltip="item.name"
                      :class="
                        item.active == true
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-700'
                      "
                      class="hover:bg-gray-700 flex items-center rounded-full p-2 hover:text-white transition-all"
                    >
                      <component
                        :is="item.icon"
                        class="h-6 w-6"
                        aria-hidden="true"
                      />
                      <span class="sr-only">{{ item.name }}</span>
                    </a>
                  </div>
                </TransitionRoot>
              </template>
              <a href="#" class="flex-shrink-0 w-full cursor-default">
                <img
                  class="block mx-auto h-10 w-10 object-cover rounded-full"
                  :src="getMe.image ? getMe.image[0] : ''"
                  alt=""
                />
                <div class="sr-only">
                  <p>
                    {{ `${getMe.first_name} ${getMe.last_name}` }}
                  </p>
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
        <div
          class="bg-white py-2 px-4 flex items-center justify-between sm:px-6 lg:px-8 border-b border-gray-200"
        >
          <div>
            <img
              class="block mx-auto h-10 w-10 object-cover rounded-full"
              :src="compLogo"
              alt="Workflow"
            />
          </div>
          <div>
            <button
              type="button"
              class="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-gray-400 rounded-md text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              @click="mobileMenuOpen = true"
            >
              <span class="sr-only">Open sidebar</span>
              <MenuIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <ModalComponent
      :state="isOpen"
      :onClose="closeModal"
      :showClose="modalFor != 'notice'"
    >
      <!-- Services -->
      <ServiceComponent
        v-if="modalFor == 'services'"
        :enabledServices="services"
      ></ServiceComponent>

      <!-- Notice  -->
      <NoticeComponent
        v-if="modalFor == 'notice'"
        :notice="notice"
      ></NoticeComponent>

      <!-- Account -->
      <AccountComponent v-if="modalFor === 'account'"></AccountComponent>
    </ModalComponent>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  MenuIcon,
  UserIcon,
  UsersIcon,
  XIcon,
  ClipboardCheckIcon,
  AdjustmentsIcon,
  PlusIcon,
  ArchiveIcon,
  FolderOpenIcon,
  ShoppingCartIcon,
  DocumentReportIcon,
  LoginIcon,
  DesktopComputerIcon,
  UserGroupIcon,
} from "@heroicons/vue/outline";
import ServiceComponent from "../components/Service.vue";
import ModalComponent from "../components/Modal.vue";
import NoticeComponent from "../components/Notice.vue";
import AccountComponent from "../components/account/Index.vue";
import accountService from "../services/account";
import { useAccountStore } from "../stores/account";
import { storeToRefs } from "pinia";
import pusher from "../pusher";
import globalEvent from "../globalEvent";
import { useRouter } from "vue-router";

const router = useRouter();
const accountStore = useAccountStore();
const { getMe } = storeToRefs(accountStore) as any;
const isLoaded = ref(false);

const servicesTemp = [
  {
    name: "Dashboard",
    to: "",
    icon: DesktopComputerIcon,
    enabled: true,
    active: false,
  },
  {
    name: "Organization",
    to: "organization",
    icon: UserGroupIcon,
    enabled: true,
    active: false,
  },
  {
    name: "Customer",
    to: "customer",
    icon: UsersIcon,
    enabled: true,
    active: false,
  },
  {
    name: "Product",
    to: "product",
    icon: ArchiveIcon,
    enabled: true,
    active: false,
  },
  {
    name: "Order",
    to: "order",
    icon: ShoppingCartIcon,
    enabled: true,
    active: false,
  },
  {
    name: "Invoice",
    to: "invoice",
    icon: ClipboardCheckIcon,
    enabled: true,
    active: false,
  },
  {
    name: "Inventory",
    to: "inventory",
    icon: FolderOpenIcon,
    enabled: true,
    active: false,
  },
  {
    name: "Report",
    to: "report",
    icon: DocumentReportIcon,
    enabled: true,
    active: false,
  },
];

const navigationTemp = [
  { name: "More", to: "#", icon: PlusIcon, enabled: true, active: false },
  {
    name: "Setting",
    to: "#",
    icon: AdjustmentsIcon,
    enabled: true,
    active: false,
  },
  { name: "Account", to: "#", icon: UserIcon, enabled: true, active: false },
  { name: "Logout", to: "#", icon: LoginIcon, enabled: true, active: false },
];

const navigation = ref([...servicesTemp, ...navigationTemp]) as any;
const services = ref(servicesTemp);
const mobileMenuOpen = ref(false);
const isOpen = ref(false);
const modalFor = ref("");
const notice = ref(null);

onMounted(async () => {
  await accountService.me();
  selectedService();
  noticeVerification();
  pusherListen();
  customEventListen();
  isLoaded.value = true;
});

const customEventListen = () => {
  globalEvent.listen.organization.logo();
};

const pusherListen = () => {
  const channel = pusher.subscribe("confirmation");
  channel.bind("user_confirmed", (data: { verified_at: string }) => {
    getMe.value.emailVerifiedAt = data.verified_at;
    noticeVerification();
  });

  channel.bind("org_confirmed", (data: { verified_at: string }) => {
    getMe.value.organizationEmailVerifiedAt = data.verified_at;
    noticeVerification();
  });
};

const noticeVerification = () => {
  if (getMe.value.emailVerifiedAt === null) {
    notice.value = {
      type: "info",
      title: "User verification",
      message: `The user verification is required before proceeding, Please check your email (${getMe.value.email}).`,
    };
    openModal("notice");
  } else if (
    getMe.value.organizationEmailVerifiedAt === null &&
    getMe.value.type == "Company"
  ) {
    notice.value = {
      type: "info",
      title: "Organization verification",
      message: `The organization verification is required before proceeding, Please check your email (${getMe.value.organizationEmail}).`,
    };
    openModal("notice");
  } else {
    notice.value = null;
    modalFor.value = "";
    closeModal();
  }
};

const navAction = (item: { name: string; to: string }) => {
  if (item.name === "More") {
    openModal("services");
  } else if (item.name === "Logout") {
    onLogout();
  } else if (item.name === "Account") {
    openModal("account");
  } else {
    window.history.replaceState({}, "", `${window.location.origin}/${item.to}`);
    selectedService();
  }
};

const compLogo = computed(() => {
  return getMe.value.logo ? getMe.value.logo : "";
});

const selectedService = () => {
  navigation.value.forEach((item: { active: boolean }) => {
    item.active = false;
  });
  const key = navigation.value.findIndex(
    (x: { to: string }) => x.to === location.pathname.split("/")[1]
  );
  if (key >= 0) navigation.value[key].active = true;
  else navigation.value[0].active = true;
};

const openModal = (type: string) => {
  isOpen.value = true;
  modalFor.value = type;
  mobileMenuOpen.value = false;
};

const closeModal = () => {
  isOpen.value = false;
};

const onLogout = async () => {
  await accountService.logout();
  window.location.replace(`${window.location.origin}/login`);
};
</script>
