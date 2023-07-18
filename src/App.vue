<template>
  <!-- <div class="app" :class="`${$route.meta.bg}`"> -->
  <div class="app">
    <DeleteModal />
    <NavBar />
    <Suspense>
      <router-view class="main" />
    </Suspense>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar/NavBar.vue";
import DeleteModal from "@/components/DeleteModal.vue";
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
// .bg-my-listing {
//   background: url("@/assets/image/img_background@3x.png");
//   background-size: cover;
// }
</style>
