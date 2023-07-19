<template>
  <router-link :to="`/detail/${house.id}`">
    <div class="house-card">
      <div class="house-info">
        <div
          class="image"
          :style="{
            background: 'url(' + house.image + ') center/cover no-repeat',
          }"
        ></div>
        <div class="description">
          <div class="address">{{ house.location.street }}</div>
          <p class="price">{{ house.price }}</p>
          <p class="location">
            {{ house.location.zip }} {{ house.location.city }}
          </p>
          <div class="info">
            <div>
              <img src="@/assets/image/ic_bed@3x.png" alt="" />
              <p>{{ house.rooms.bedrooms }}</p>
            </div>
            <div>
              <img src="@/assets/image/ic_bath@3x.png" alt="" />
              <p>{{ house.rooms.bathrooms }}</p>
            </div>
            <div>
              <img src="@/assets/image/ic_size@3x.png" alt="" />
              <p>{{ house.size }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="actions" v-if="house.madeByMe == true">
        <router-link :to="`/edit/${house.id}`"
          ><button class="icon-btn">
            <img src="@/assets/image/ic_edit@3x.png" alt="" /></button
        ></router-link>

        <button class="icon-btn">
          <img src="@/assets/image/ic_delete@3x.png" alt="" />
        </button>
      </div>
    </div>
  </router-link>
</template>
<script setup>
import { defineProps } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  house: Object,
});
</script>
<style lang="scss">
@import "@/styles/card.scss";
</style>
