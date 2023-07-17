<template>
  <button :class="{ active: isActive }" @click="toggleButton">
    <span v-if="!isActive">Off</span>
    <span v-else>On</span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleButton() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style>
button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.active {
  background-color: #007bff;
  color: #fff;
}
</style>
