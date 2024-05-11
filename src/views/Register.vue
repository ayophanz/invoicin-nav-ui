<template>
  <Modal :state="true" :showClose="false" :dialogClass="dialogClass">
    <div v-if="registrationStep === 'user'" class="form w-[90%] mx-auto py-5">
      <div class="mb-5">
        <h1 class="text-2xl font-medium leading-6 text-gray-900">
          User Information
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Asterisk(*) is required fields.
        </p>
      </div>
      <Form :form="userForm"></Form>
      <div class="pt-5">
        <div class="flex justify-end">
          <button
            @click="onBack('sign_in')"
            type="button"
            class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            @click="onValidateUser"
            :disabled="submitLoading"
            type="button"
            class="disabled:opacity-75 ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Spinner v-if="submitLoading"></Spinner>
            Next
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="registrationStep === 'organization'"
      class="form w-[90%] mx-auto py-5"
    >
      <div class="mb-5">
        <h1 class="text-2xl font-medium leading-6 text-gray-900">
          Additional Information
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Asterisk(*) is required fields.
        </p>
      </div>
      <div class="mb-2">
        <label for="type" class="block text-sm font-medium text-gray-700"
          >Type</label
        >
        <select
          @change="onTypeChange(type)"
          v-model="type"
          id="type"
          name="type"
          class="mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
        >
          <option value="Company">Company</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div v-if="type == 'Company'" class="mt-5">
        <div class="mb-3">
          <h2 class="text-xl font-medium leading-6 text-gray-900">
            Organization
          </h2>
        </div>
        <Form :form="orgForm"></Form>
      </div>
      <div class="mt-5">
        <div class="mb-3">
          <h2 class="text-xl font-medium leading-6 text-gray-900">
            Billing Address
          </h2>
        </div>
        <Form :form="billingAddressForm"></Form>
      </div>
      <div class="pt-5">
        <div class="flex justify-end">
          <button
            @click="onBack('user')"
            type="button"
            class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            @click="onValidateOrganization"
            :disabled="submitLoading"
            type="button"
            class="disabled:opacity-75 ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Spinner v-if="submitLoading"></Spinner>
            Next
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="registrationStep === 'complete'"
      class="space-y-8 divide-y divide-gray-200 w-80 mx-auto"
    >
      <div class="mb-3">
        <h2 class="text-xl font-medium leading-6 text-gray-900">
          Almost there!
        </h2>
      </div>
      <div class="flex flex-col justify-center items-center pt-5">
        <button
          @click="onSaveComplete"
          :disabled="submitLoading"
          type="button"
          class="disabled:opacity-75 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-5 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Spinner v-if="submitLoading"></Spinner>
          Save & Login
        </button>
        <div class="text-base mt-3">
          <a
            href="#"
            @click="onBack('organization')"
            class="font-normal text-center hover:underline hover:text-blue-400"
          >
            back
          </a>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Modal from "../components/Modal.vue";
import Form from "../components/form/Form.vue";
import Spinner from "../components/Spinner.vue";
import registerService from "../services/register/index.js";
import sharedService from "../services/shared/index.js";
import { useRouter } from "vue-router";
import formUtil from "../utils/form.js";

const router = useRouter();

const dialogClass = ref("w-full");
const submitLoading = ref(false);
const registrationStep = ref("user");
const type = ref("Company");
let userForm = reactive(
  new formUtil({
    firstname: {
      label: "First Name*",
      value: "",
      type: "text",
    },
    lastname: {
      label: "Last Name*",
      value: "",
      type: "text",
    },
    email: {
      label: "Email address*",
      value: "",
      type: "email",
    },
    password: {
      label: "Password*",
      value: "",
      type: "password",
    },
    passwordConfirmation: {
      label: "Confirm password*",
      value: "",
      type: "password",
    },
  })
);
let orgForm = reactive(
  new formUtil({
    orgName: {
      label: "Name*",
      value: "",
      type: "text",
    },
    orgEmail: {
      label: "Email*",
      value: "",
      type: "email",
    },
  })
);
let billingAddressForm = reactive(
  new formUtil({
    country: {
      label: "Country*",
      value: "",
      type: "select",
    },
    stateProvince: {
      label: "State / Province",
      value: "",
      type: "text",
    },
    city: {
      label: "City*",
      value: "",
      type: "text",
    },
    zipcode: {
      label: "Zipcode*",
      value: "",
      type: "text",
    },
    address: {
      label: "Address*",
      value: "",
      type: "text",
    },
  })
);

onMounted(() => {
  showOptons();
});

const showOptons = async () => {
  await sharedService
    .countries()
    .then((response: any) => {
      billingAddressForm.setOptions("country", response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const onValidateUser = async () => {
  submitLoading.value = true;
  userForm.setErrors({});
  let formData = userForm.getFormData() as any;
  formData.form_type = "user";
  await registerService
    .validate(formData)
    .then(() => {
      registrationStep.value = "organization";
      submitLoading.value = false;
    })
    .catch((error) => {
      userForm.setErrors(error);
      submitLoading.value = false;
    });
};

const onValidateOrganization = async () => {
  const orgFormData = orgForm.getFormData();
  const billingAddressFormData = billingAddressForm.getFormData();

  let formData = {
    ...orgFormData,
    ...billingAddressFormData,
  } as any;

  formData.form_type = "org";
  if (type.value == "Personal") {
    formData = billingAddressFormData;
    formData.form_type = "address";
  }

  submitLoading.value = true;
  orgForm.setErrors({});
  billingAddressForm.setErrors({});

  formData.type = type.value;
  await registerService
    .validate(formData)
    .then(() => {
      submitLoading.value = false;
      registrationStep.value = "complete";
      dialogClass.value = "w-auto";
    })
    .catch((error) => {
      submitLoading.value = false;
      orgForm.setErrors(error);
      billingAddressForm.setErrors(error);
    });
};

const onSaveComplete = async () => {
  submitLoading.value = true;

  let formData = {
    ...userForm.getFormData(),
    ...orgForm.getFormData(),
    ...billingAddressForm.getFormData(),
  } as any;

  if (type.value == "Personal") {
    formData = {
      ...userForm.getFormData(),
      ...billingAddressForm.getFormData(),
    };
  }

  formData.type = type.value;
  await registerService
    .store(formData)
    .then(() => {
      submitLoading.value = false;
      router.push({ name: "login" });
    })
    .catch((error) => {
      console.log(error);
      submitLoading.value = false;
    });
};

const onBack = (type: string) => {
  dialogClass.value = "w-full";
  if (type === "organization") registrationStep.value = "organization";
  if (type === "user") registrationStep.value = "user";
  if (type === "sign_in") router.push({ name: "login" });
};

const onTypeChange = () => {
  billingAddressForm.setErrors({});
};
</script>
