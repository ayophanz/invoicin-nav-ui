<template>
  <div>
    <div class="my-5 py-2 px-4 bg-red-100 rounded">
      <p class="text-red-600">
        You are in free mode, by upgrading you can access all modules.
        <a href="#" class="text-blue-700">Upgrade Now</a>
      </p>
    </div>
    <h3 class="text-lg font-medium leading-6 text-gray-900">
      Available Modules
    </h3>

    <div class="mt-2">
      <p class="text-sm text-gray-500">Here you can add or remove modules.</p>
    </div>

    <div class="mt-4">
      <ul
        role="list"
        class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <li
          v-for="service in services"
          :key="service.name"
          class="col-span-1 flex shadow-sm rounded-md"
        >
          <div
            :class="[
              service.bgColor,
              'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md',
            ]"
          >
            <Component
              :is="service.icon"
              class="h-6 w-6"
              aria-hidden="true"
            ></Component>
          </div>
          <div
            class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate"
          >
            <div class="flex-1 px-4 py-2 text-sm truncate">
              <a
                :href="service.href"
                class="text-gray-900 font-medium hover:text-gray-600"
                >{{ service.name }}</a
              >
              <p class="text-gray-500">{{ service.description }}</p>
            </div>
            <div class="flex-shrink-0 pr-2">
              <Switch
                v-model="service.enabled"
                name="enabled[]"
                :class="service.enabled ? 'bg-green-500' : 'bg-gray-200'"
                class="relative inline-flex h-6 w-11 items-center rounded-full"
              >
                <span class="sr-only">Enable</span>
                <span
                  :class="service.enabled ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white"
                ></span>
              </Switch>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
/** Imports */
import { toRef, ref, watch, onMounted } from "vue";
import { Switch } from "@headlessui/vue";

import {
  UsersIcon,
  ClipboardDocumentCheckIcon,
  ArchiveBoxIcon,
  FolderOpenIcon,
  ShoppingCartIcon,
  PresentationChartLineIcon,
} from "@heroicons/vue/24/outline";

/** Process */
const props = defineProps({
  enabledServices: {
    type: Array,
    required: true,
  },
});

/** Variables */
const services = ref([
  {
    name: "Customer",
    href: "#",
    description: "Free",
    bgColor: "bg-pink-600",
    icon: UsersIcon,
    enabled: true,
  },
  {
    name: "Product",
    href: "#",
    description: "Free",
    bgColor: "bg-purple-600",
    icon: ArchiveBoxIcon,
    enabled: false,
  },
  {
    name: "Order",
    href: "#",
    description: "Upgrade",
    bgColor: "bg-yellow-500",
    icon: ShoppingCartIcon,
    enabled: false,
  },
  {
    name: "Invoice",
    href: "#",
    description: "Free",
    bgColor: "bg-green-500",
    icon: ClipboardDocumentCheckIcon,
    enabled: true,
  },
  {
    name: "Inventory",
    href: "#",
    description: "Upgrade",
    bgColor: "bg-indigo-500",
    icon: FolderOpenIcon,
    enabled: false,
  },
  {
    name: "Report",
    href: "#",
    description: "Upgrade",
    bgColor: "bg-gray-700",
    icon: PresentationChartLineIcon,
    enabled: false,
  },
]);

const enabledServices = toRef(props.enabledServices);

/** Functions */
const enabledService = (item: any, service: any) => {
  if (item.enabled && item.name == service) {
    enabledServices.value.filter((item) => {
      if (Object(item).name == service) Object(item).enabled = true;
    });
  }
  if (!item.enabled && item.name == service) {
    enabledServices.value.filter((item) => {
      if (Object(item).name == service) Object(item).enabled = false;
    });
  }
};

const initServices = () => {
  enabledServices.value.filter((item) => {
    services.value.filter((item2) => {
      if (Object(item).name == Object(item2).name)
        Object(item2).enabled = Object(item).enabled;
    });
  });
};

/** Built-in functions */
watch(services.value, (newVal) => {
  return newVal.forEach((item) => {
    const services = [
      "Customer",
      "Product",
      "Order",
      "Invoice",
      "Inventory",
      "Report",
    ];
    services.forEach((item2) => {
      enabledService(item, item2);
    });
  });
});

onMounted(() => {
  initServices();
});
</script>
