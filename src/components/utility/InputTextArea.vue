<template>
  <div class="input">
    <label :for="inputId">{{ labelText }}</label>
    <textarea
      :rows="textAreaRow"
      :id="inputId"
      :name="inputId"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  label: String,
  required: { type: Boolean, default: false },
  placeholder: String,
  disabled: { type: Boolean, default: false },
  textAreaRow: { type: Number, default: 4 },
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
