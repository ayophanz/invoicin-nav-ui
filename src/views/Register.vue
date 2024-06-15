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
        <div class="flex justify-end gap-x-2">
          <Button @click="onBack('sign_in')" type="button"> Cancel </Button>
          <Button
            @click="onValidateUser"
            :disabled="submitLoading"
            moreClass="!text-white !bg-gray-700"
          >
            <Spinner v-if="submitLoading"></Spinner>
            <span>Next</span>
          </Button>
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
        <Form :form="typeForm"></Form>
      </div>
      <div v-if="type == 'company'" class="mt-5">
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
        <div class="flex justify-end gap-x-2">
          <Button @click="onBack('user')"> Cancel </Button>
          <Button
            @click="onValidateOrganization"
            :disabled="submitLoading"
            moreClass="!text-white !bg-gray-700"
          >
            <Spinner v-if="submitLoading"></Spinner>
            <span>Next</span>
          </Button>
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
        <Button
          @click="onSaveComplete"
          :disabled="submitLoading"
          moreClass="!text-white !bg-gray-700"
        >
          <Spinner v-if="submitLoading"></Spinner>
          <span>Save & Login</span>
        </Button>
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
import { ref, reactive, onMounted, watch } from "vue";
import Modal from "../components/Modal.vue";
import Form from "../components/form/Form.vue";
import Spinner from "../components/Spinner.vue";
import registerService from "../services/register/index.js";
import sharedService from "../services/shared/index.js";
import { useRouter } from "vue-router";
import formUtil from "../utils/form.js";
import Button from "../components/Button.vue";

const router = useRouter();

const dialogClass = ref("w-full");
const submitLoading = ref(false);
const registrationStep = ref("user");
const type = ref("company");
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
let typeForm = reactive(
  new formUtil({
    type: {
      label: "Type",
      value: type.value,
      type: "select",
      options: [
        { id: "company", name: "Company" },
        { id: "personal", name: "Personal" },
      ],
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
  if (type.value == "personal") {
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

  if (type.value == "personal") {
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

// const onTypeChange = () => {
//   billingAddressForm.setErrors({});
// };

watch(typeForm, (form) => {
  type.value = form.getFieldValue("type");
  billingAddressForm.setErrors({});
});
</script>
