<template>
  <div class="search-bar">
    <img src="@/assets/image/ic_search@3x.png" alt="" /><input
      type="text"
      placeholder="Search for a house"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <img
      class="clear-btn"
      v-if="modelValue"
      @click="clearInput"
      src="@/assets/image/ic_clear@3x.png"
      alt=""
    />
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);
const clearInput = () => {
  emit("update:modelValue", ""); // Update the modelValue prop with an empty string
};
</script>
<style lang="scss">
@import "@/styles/searchbar.scss";
</style>
