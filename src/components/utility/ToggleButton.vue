<template>
  <div class="row">
    <button
      class="col left"
      :class="{
        'active-toggle': activeButton === options[0],
      }"
      @click="toggleButton(options[0])"
    >
      {{ options[0] }}
    </button>
    <button
      class="col right"
      :class="{
        'active-toggle': activeButton === options[1],
      }"
      @click="toggleButton(options[1])"
    >
      {{ options[1] }}
    </button>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";
const props = defineProps({
  options: { type: Array, default: () => [] },
});
const activeButton = ref(props.options[0]);
const emit = defineEmits(["update"]);
const toggleButton = (button) => {
  activeButton.value = button;
  emit("update", button);
};
</script>
<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/breakpoints.scss";
.row {
  display: flex;
}
.col {
  background: $tertiary-2-color;
  color: white;
  font-size: 14px;
  padding: 0.5em 3.5em;
  @include sm {
    width: 100%;
  }
}
.left {
  border-radius: 5px 0 0 5px;
}
.right {
  border-radius: 0 5px 5px 0;
}
.active-toggle {
  background: $primary-color;
}
</style>
