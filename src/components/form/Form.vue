<template>
  <div class="form-component">
    <div v-for="(field, key) in fields" :key="key">
      <Input
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
      ></Input>

      <Radio
        v-else-if="field.type == 'radio'"
        :value="field.value"
        :options="field.options"
        :label="field.label"
        :error-message="field.errorMessage"
        :name="`${key}`"
        v-show="field.visible == undefined || field.visible ? true : false"
        @onchange-data="updateValue"
      ></Radio>

      <Checkbox
        v-else-if="field.type == 'checkbox'"
        :value="field.value"
        :label="field.label"
        :error-message="field.errorMessage"
        :name="`${key}`"
        v-show="field.visible == undefined || field.visible ? true : false"
        @onchange-data="updateValue"
      ></Checkbox>

      <File
        v-else-if="field.type === 'file'"
        :value="field.value"
        :label="field.label"
        :error-message="field.errorMessage"
        :name="`${key}`"
        v-show="field.visible == undefined || field.visible ? true : false"
        @onchange-data="updateValue"
      ></File>

      <Select
        v-else-if="field.type === 'select'"
        :value="field.value"
        :options="field.options"
        :label="field.label"
        :error-message="field.errorMessage"
        :name="`${key}`"
        v-show="field.visible == undefined || field.visible ? true : false"
        @onchange-data="updateValue"
      ></Select>
    </div>
    <div v-if="props.submit" class="pt-5">
      <div class="flex justify-center">
        <Button @click="props.submit" :disabled="props.form.getLoading()">
          <Spinner v-if="props.form.getLoading()"></Spinner>
          {{ props.submitText ? props.submitText : "Save" }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from "vue";
import Input from "./Input.vue";
import File from "./File.vue";
import Select from "./Select.vue";
import Radio from "./Radio.vue";
import Checkbox from "./Checkbox.vue";
import Spinner from "../Spinner.vue";
import Button from "../Button.vue";

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
