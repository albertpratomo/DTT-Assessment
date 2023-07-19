<template>
  <div class="app">
    <Modal />
    <NavBar />
    <Suspense>
      <router-view class="main" />
    </Suspense>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar/NavBar.vue";
import Modal from "@/components/DeleteModal.vue";
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.app {
  font-family: $primary-font;
  text-align: center;
  color: $primary-text-color;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: $bg-1-color;
}
.main {
  flex-grow: 1;
  padding: 16px;
}
</style>
