<template>
  <div class="house-card">
    <div class="house-info">
      <div
        class="image"
        :style="{
          background: 'url(' + house.image + ') center/cover no-repeat',
        }"
      ></div>
      <router-link :to="`/detail/${house.id}`">
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
      </router-link>
    </div>
    <div class="actions" v-if="house.madeByMe == true">
      <router-link :to="`/edit/${house.id}`"
        ><button class="icon-btn">
          <img src="@/assets/image/ic_edit@3x.png" alt="" /></button
      ></router-link>

      <button class="icon-btn" @click="handleOnClickOpenModal">
        <img src="@/assets/image/ic_delete@3x.png" alt="" />
      </button>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import { useModal } from "@/stores/modal";
import { deleteHouse } from "@/api/deleteHouseApi";
const props = defineProps({
  house: Object,
});
const emit = defineEmits(["houseDeleted"]);
const modal = useModal();
const handleOnClickOpenModal = () => {
  modal.open(
    "Delete Listing",
    "Are you sure you want to delete this listing? This action cannot be undone.",
    "",
    [
      {
        label: "YES, DELETE",
        btnType: "primary",
        callback: async () => {
          console.log("SAVED!");
          const res = await deleteHouse(props.house.id);
          console.log("DELETE API RES: ");
          console.log(res);
          if (res.ok) {
            modal.close();
            modal.open("Listing deleted!", "", "correct.png", [
              {
                label: "OK",
                btnType: "primary",
                callback: () => {
                  modal.close();
                },
              },
            ]);
            emit("houseDeleted");
            console.log("RES OK");
          } else {
            modal.close();
            console.log("ERROR: " + res);
            modal.open("Failed to delete listing", "", "ic_clear@3x.png", [
              {
                label: "OK",
                btnType: "primary",
                callback: () => {
                  modal.close();
                },
              },
            ]);
          }
        },
      },
      {
        label: "GO BACK",
        btnType: "secondary",
        callback: () => {
          modal.close();
        },
      },
    ]
  );
};
</script>
<style lang="scss">
@import "@/styles/card.scss";
</style>
