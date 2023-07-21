<template>
  <div class="input">
    <label :for="inputId">{{ labelText }}</label>
    <input
      :type="type"
      :class="{ error: isError }"
      :id="inputId"
      :name="inputId"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="userInteracted = true"
      @blur="userInteracted = true"
    />
    <div class="error-msg" v-if="isError">Required field missing.</div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";

const props = defineProps({
  type: { type: String, default: "text" },
  label: String,
  required: { type: Boolean, default: false },
  placeholder: String,
  disabled: { type: Boolean, default: false },
  modelValue: String,
  isError: { type: Boolean, default: false },
});
defineEmits(["update:modelValue"]);

const labelText = computed(() =>
  props.required ? props.label + "*" : props.label
);
const inputId = computed(() =>
  props.label.toLowerCase().replace(/[^a-z]/gi, "")
);
const userInteracted = ref(false);
const isError = computed(() => {
  return userInteracted.value && props.required && !props.modelValue.trim();
});
</script>
<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/breakpoints.scss";
.error {
  border: solid 1px red;
}
.error-msg {
  font-style: italic;
  color: red;
  font-family: $primary-font;
  font-weight: 500;
  font-size: 14px;
  @include sm {
    font-size: 12px;
  }
}
</style>
