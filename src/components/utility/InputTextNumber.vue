<template>
  <div class="input">
    <label :for="inputId">{{ labelText }}</label>
    <input
      :type="type"
      :id="inputId"
      :name="inputId"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  type: { type: String, default: "text" },
  label: String,
  required: { type: Boolean, default: false },
  placeholder: String,
  disabled: { type: Boolean, default: false },
  modelValue: String,
});
defineEmits(["update:modelValue"]);

const labelText = computed(() =>
  props.required ? props.label + "*" : props.label
);
const inputId = computed(() =>
  props.label.toLowerCase().replace(/[^a-z]/gi, "")
);
</script>
<style scoped lang="scss">
@import "@/styles/variables.scss";
</style>
