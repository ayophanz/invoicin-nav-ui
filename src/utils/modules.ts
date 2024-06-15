import {
  UserGroupIcon,
  UsersIcon,
  ArchiveBoxIcon,
  ComputerDesktopIcon,
  ShoppingCartIcon,
  ClipboardDocumentCheckIcon,
  FolderOpenIcon,
  DocumentArrowUpIcon,
} from "@heroicons/vue/24/outline";

export default class Modules {
  dashboard() {
    return {
      name: "Dashboard",
      to: "",
      icon: ComputerDesktopIcon,
      enabled: true,
      active: false,
    };
  }

  organization() {
    return {
      name: "Organization",
      to: "organization",
      icon: UserGroupIcon,
      enabled: true,
      active: false,
    };
  }

  customer() {
    return {
      name: "Customer",
      to: "customer",
      icon: UsersIcon,
      enabled: true,
      active: false,
    };
  }

  product() {
    return {
      name: "Product",
      to: "product",
      icon: ArchiveBoxIcon,
      enabled: true,
      active: false,
    };
  }

  order() {
    return {
      name: "Order",
      to: "order",
      icon: ShoppingCartIcon,
      enabled: true,
      active: false,
    };
  }

  invoice() {
    return {
      name: "Invoice",
      to: "invoice",
      icon: ClipboardDocumentCheckIcon,
      enabled: true,
      active: false,
    };
  }

  inventory() {
    return {
      name: "Inventory",
      to: "inventory",
      icon: FolderOpenIcon,
      enabled: true,
      active: false,
    };
  }

  report() {
    return {
      name: "Report",
      to: "report",
      icon: DocumentArrowUpIcon,
      enabled: true,
      active: false,
    };
  }
}
