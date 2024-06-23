<template>
  <div class="form-component">
    <div v-for="(field, key) in fields" :key="key">
      <InputComponent
        v-if="
          field.type === 'text' ||
          field.type === 'email' ||
          field.type === 'password'
        "
        :type="field.type"
        :value="field.value"
        :label="field.label"
        :disabled="field.disabled"
        :error-message="field.errorMessage"
        :name="`${key}`"
        v-show="field.visible == undefined || field.visible ? true : false"
        @onchange-data="updateValue"
      ></InputComponent>

      <RadioComponent
        v-else-if="field.type == 'radio'"
        :value="field.value"
        :options="field.options"
        :label="field.label"
        :error-message="field.errorMessage"
        :name="`${key}`"
        v-show="field.visible == undefined || field.visible ? true : false"
        @onchange-data="updateValue"
      ></RadioComponent>

      <CheckboxComponent
        v-else-if="field.type == 'checkbox'"
        :value="field.value"
        :label="field.label"
        :error-message="field.errorMessage"
        :name="`${key}`"
        v-show="field.visible == undefined || field.visible ? true : false"
        @onchange-data="updateValue"
      ></CheckboxComponent>

      <MessageComponent
        v-else-if="field.type === 'message'"
        :value="field.value"
        :label="field.label"
        :name="field.name"
      ></MessageComponent>

      <FileComponent
        v-else-if="field.type === 'file'"
        :value="field.value"
        :label="field.label"
        :error-message="field.errorMessage"
        :name="`${key}`"
        v-show="field.visible == undefined || field.visible ? true : false"
        @onchange-data="updateValue"
      ></FileComponent>

      <SelectComponent
        v-else-if="field.type === 'select'"
        :value="field.value"
        :options="field.options"
        :label="field.label"
        :error-message="field.errorMessage"
        :name="`${key}`"
        v-show="field.visible == undefined || field.visible ? true : false"
        @onchange-data="updateValue"
      ></SelectComponent>
    </div>
    <div v-if="props.submit" class="pt-5">
      <div class="flex justify-center">
        <ButtonComponent
          @click="props.submit"
          :disabled="props.form.getLoading()"
        >
          <SpinnerComponent v-if="props.form.getLoading()"></SpinnerComponent>
          {{ props.submitText ? props.submitText : "Save" }}
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from "vue";
import InputComponent from "./InputComponent.vue";
import FileComponent from "./FileComponent.vue";
import SelectComponent from "./SelectComponent.vue";
import RadioComponent from "./RadioComponent.vue";
import CheckboxComponent from "./CheckboxComponent.vue";
import SpinnerComponent from "../SpinnerComponent.vue";
import MessageComponent from "./MessageComponent.vue";
import ButtonComponent from "../ButtonComponent.vue";

const emit = defineEmits(["onchangeForm"]);

const props = defineProps({
  submit: {
    type: Function,
    required: false,
  },
  submitText: {
    type: String,
    required: false,
  },
  form: {
    type: Object,
    required: true,
  },
});

let fields = ref(props.form.fields());

onUpdated(() => {
  initErrors(fields);
});

const initErrors = (fields: any) => {
  if (fields.value.errors && Object.keys(fields.value.errors).length > 0) {
    Object.keys(fields.value.errors).forEach(function (key) {
      if (
        typeof fields.value[key] !== "undefined" &&
        fields.value.errors &&
        fields.value.errors[key]
      )
        fields.value[key].errorMessage = fields.value.errors[key][0];
    });
  } else {
    Object.keys(fields.value).forEach(function (key) {
      delete fields.value[key].errorMessage;
    });
  }
};

let updateValue = (value: object) => {
  props.form.updateFormData(value);
};
</script>
