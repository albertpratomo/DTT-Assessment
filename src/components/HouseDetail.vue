<template>
  <div class="house-detail" v-if="house">
    <div
      class="image"
      :style="{ background: 'url(' + house.image + ') center/cover no-repeat' }"
    ></div>
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
import { useModal } from "@/stores/modal";
import { getHouseById } from "@/api/houseByIdApi";
import { defineProps, ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
const props = defineProps({
  house: Object,
  id: String,
});
const house = ref();
const modal = useModal();
function handleOnClickOpenModal() {
  modal.open();
}
async function fetchHouseById(id) {
  const data = await getHouseById(id);
  house.value = data[0]; // Update the house value
}
// Fetch the house data on component mount
fetchHouseById(props.id);

// Watch for route parameter changes and fetch updated data accordingly
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    fetchHouseById(to.params.id);
  }
});
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
  aspect-ratio: 2433/1626;
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
