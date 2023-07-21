<template>
  <div class="page-content">
    <div class="section-detail-1">
      <router-link to="/">
        <ActionButton
          class="btn btn-back-desktop"
          type="label"
          prependIcon="ic_back_grey@3x.png"
          >Back to overview</ActionButton
        >
        <ActionButton class="btn btn-back-mobile" type="label"
          ><img
            style="width: 1.5em"
            src="@/assets/image/ic_back_white@3x.png"
            alt=""
        /></ActionButton>
      </router-link>
    </div>
    <div class="section-detail-2">
      <Suspense>
        <template #default>
          <HouseDetail :id="id" />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>

      <div class="rec-list">
        <div class="header-2">Recommended for you</div>
        <Suspense>
          <template #default>
            <div>
              <HouseCard
                v-for="house in houses"
                :key="house.id"
                :house="house"
              />
            </div>
          </template>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>
<script setup>
import HouseCard from "@/components/utility/HouseCard.vue";

import { ref } from "vue";
import { getRecHouses } from "@/api/RecHousesApi";
import ActionButton from "@/components/utility/ActionButton.vue";
import HouseDetail from "@/components/HouseDetail.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = route?.params?.id;
const houses = ref(await getRecHouses(id));
</script>
<style scoped lang="scss">
@import "@/styles/pages.scss";
.page-content {
  @include sm {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }
}
.section-detail-1 {
  margin-top: 1.5em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  display: flex;
  @include sm {
    position: absolute;
    top: 0;
    left: 1.5em;
    padding-top: 0;
  }
}
.btn {
  padding-left: 0;
}

.btn-back-desktop {
  @include sm {
    display: none;
  }
}

.btn-back-mobile {
  display: none;
  @include sm {
    display: block;
  }
}

.section-detail-2 {
  display: flex;
  padding-bottom: 0.5em;
  justify-content: space-between;
  gap: 1em;
  @include rwd(1026) {
    flex-direction: column;
  }
}

.rec-list {
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  @include rwd(1026) {
    width: auto;
    padding-left: 5%;
    padding-right: 5%;
  }
}

.rec-list .header-2 {
  text-align: left;
}
</style>
