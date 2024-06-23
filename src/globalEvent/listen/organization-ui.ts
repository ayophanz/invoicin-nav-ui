// @ts-nocheck
import { useAccountStore } from "../../stores/account";
import { storeToRefs } from "pinia";
const prefix = "nav-ui";

export const logo = () => {
  const accountStore = useAccountStore();
  const { getMe } = storeToRefs(accountStore);

  const eventName = `${prefix}_logo`;
  window.addEventListener(eventName, (e: { detail: any }) => {
    window.removeEventListener(eventName, null);
    getMe.value.logo = e.detail;
    accountStore.setMe(getMe.value);
  });
};

export default {
  logo,
};
