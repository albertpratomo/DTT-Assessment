<template>
  <nav class="desktop-nav">
    <div class="logo">
      <img src="@/assets/image/img_logo_dtt@3x.png" alt="Logo" />
    </div>
    <ul>
      <li>
        <router-link class="nav-item" to="/">Houses</router-link>
      </li>
      <li><router-link class="nav-item" to="/about">About</router-link></li>
      <li>
        <router-link class="nav-item" to="/mylisting">My Listings</router-link>
      </li>
    </ul>
  </nav>
  <nav class="mobile-nav">
    <div>
      <div>
        <router-link class="nav-item" to="/"
          ><img :src="homeSrc" alt=""
        /></router-link>
      </div>

      <div>
        <router-link class="nav-item" to="/about"
          ><img :src="aboutSrc" alt=""
        /></router-link>
      </div>

      <div>
        <router-link class="nav-item" to="/mylisting"
          ><img :src="myListingSrc" alt=""
        /></router-link>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, reactive, onMounted, watch } from "vue";
const homeSrc = ref("");
const aboutSrc = ref("");
const myListingSrc = ref("");
onMounted(async () => {
  const currentRoute = useRoute();
  updateImages(currentRoute.path);
});

const updateImages = async (route) => {
  switch (route) {
    case "/mylisting":
      homeSrc.value = (
        await import("@/assets/image/ic_mobile_navigarion_home@3x.png")
      ).default;
      aboutSrc.value = (
        await import("@/assets/image/ic_mobile_navigarion_info@3x.png")
      ).default;
      myListingSrc.value = (await import("@/assets/image/list.png")).default;
      break;
    case "/about":
      homeSrc.value = (
        await import("@/assets/image/ic_mobile_navigarion_home@3x.png")
      ).default;
      aboutSrc.value = (
        await import("@/assets/image/ic_mobile_navigarion_info_active@3x.png")
      ).default;
      myListingSrc.value = (
        await import("@/assets/image/list (1).png")
      ).default;
      break;
    default:
      homeSrc.value = (
        await import("@/assets/image/ic_mobile_navigarion_home_active@3x.png")
      ).default;
      aboutSrc.value = (
        await import("@/assets/image/ic_mobile_navigarion_info@3x.png")
      ).default;
      myListingSrc.value = (
        await import("@/assets/image/list (1).png")
      ).default;
  }
};
const route = reactive(useRoute());
watch(route, (to) => {
  updateImages(to.path);
});
</script>
<style lang="scss">
@import "@/styles/navbar.scss";
</style>
