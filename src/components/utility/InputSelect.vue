<template>
  <div class="input">
    <label :for="inputId">{{ labelText }}</label>
    <select
      :id="inputId"
      :name="inputId"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled selected style="display: none">
        {{ placeholder }}
      </option>
      <option
        v-for="option in selectOptions"
        :key="option.label"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  label: String,
  required: { type: Boolean, default: false },
  placeholder: String,
  disabled: { type: Boolean, default: false },
  modelValue: String,
  selectOptions: { type: Array, default: () => [] },
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
