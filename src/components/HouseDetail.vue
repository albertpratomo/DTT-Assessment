<template>
  <div class="house-detail">
    <div class="image"></div>
    <div class="detail">
      <div class="row-detail-1">
        <div class="header-1">{{ house.location.street }}</div>
        <div class="actions-1" v-if="house.madeByMe">
          <button class="icon-btn">
            <img src="@/assets/image/ic_edit@3x.png" alt="" />
          </button>
          <button class="icon-btn" @click="handleOnClickOpenModal">
            <img src="@/assets/image/ic_delete@3x.png" alt="" />
          </button>
        </div>
      </div>
      <div class="info">
        <img src="@/assets/image/ic_location@3x.png" alt="" />
        <p>
          {{ house.location.zip }}
          {{ house.location.city }}
        </p>
      </div>
      <div class="info">
        <div>
          <img src="@/assets/image/ic_price@3x.png" alt="" />
          <p>{{ house.price }}</p>
        </div>
        <div>
          <img src="@/assets/image/ic_size@3x.png" alt="" />
          <p>{{ house.size }}</p>
        </div>
        <div>
          <img src="@/assets/image/ic_construction_date@3x.png" alt="" />
          <p>Built in {{ house.constructionYear }}</p>
        </div>
      </div>
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
          <img src="@/assets/image/ic_garage@3x.png" alt="" />
          <p>{{ house.hasGarage }}</p>
        </div>
      </div>
      <p class="desc">
        {{ house.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
//import { useModal } from "@/stores/modal";
import { getHouseById } from "@/api/houseByIdApi";
import { defineProps, ref } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  id: String,
});

const data = await getHouseById(props.id);
const house = ref(data[0])
// const modal = useModal();
// function handleOnClickOpenModal() {
//   modal.open();
// }
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.house-detail {
  //   font-family: $secondary-font;
  //   color: $secondary-text-color;
  width: 58%;
  background: white;
}
.house-detail .image {
  width: 100%;
  height: 60%;
  background-image: url("@/assets/image/img_placeholder_house@3x.png");
  background-size: cover;
}
.detail {
  padding: 2em;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.detail .info {
  font-family: $secondary-font;
  font-weight: 600;
}
.detail p.desc {
  font-family: $secondary-font;
  color: $secondary-text-color;
}
.row-detail-1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
