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
          <router-link :to="`/edit/${house.id}`">
            <button class="icon-btn icon-btn-desktop">
              <img src="@/assets/image/ic_edit@3x.png" alt="" />
            </button>
          </router-link>
          <button
            class="icon-btn icon-btn-desktop"
            @click="handleOnClickOpenModal"
          >
            <img src="@/assets/image/ic_delete@3x.png" alt="" /></button
          ><router-link :to="`/edit/${house.id}`">
            <button class="icon-btn icon-btn-mobile">
              <img src="@/assets/image/ic_edit_white@3x.png" alt="" /></button
          ></router-link>
          <button
            class="icon-btn icon-btn-mobile"
            @click="handleOnClickOpenModal"
          >
            <img src="@/assets/image/ic_delete_white@3x.png" alt="" />
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
import { getHouseById } from "@/api/getHouseByIdApi";
import { defineProps, ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useRoute } from "vue-router";
import { useModal } from "@/stores/modal";
import { deleteHouse } from "@/api/deleteHouseApi";
const props = defineProps({
  house: Object,
  id: String,
});
const house = ref();

async function fetchHouseById(id) {
  const data = await getHouseById(id);
  house.value = data[0];
}

fetchHouseById(props.id);

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    fetchHouseById(to.params.id);
  }
});
const router = useRoute();
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
                  router.push("/");
                },
              },
            ]);
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
@import "@/styles/variables.scss";
@import "@/styles/breakpoints.scss";
.house-detail {
  flex-grow: 1;
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
  @include sm {
    border-radius: 50px 50px 0 0;
    background: white;
    margin-top: -50px;
  }
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
.actions-1 {
  @include sm {
    position: absolute;
    top: 1.5em;
    right: 1.5em;
    display: flex;
    gap: 1em;
  }
}
.icon-btn-mobile {
  display: none;
  @include sm {
    display: block;
  }
}
.icon-btn-desktop {
  @include sm {
    display: none;
  }
}
</style>
