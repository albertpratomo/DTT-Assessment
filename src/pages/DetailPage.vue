<template>
  <div class="page-content">
    <div class="section-detail-1">
      <router-link to="/">
        <PrimaryButton
          class="btn"
          type="label"
          prependIcon="ic_back_grey@3x.png"
          >Back to overview</PrimaryButton
        >
      </router-link>
    </div>
    <div class="section-detail-2">
      <Suspense>
        <template #default>
          <HouseDetail v-if="houseLoaded" :house="house.value" />
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

import { ref, onMounted, nextTick } from "vue";
import { getHouses } from "@/api/housesApi";
import { getHouseById } from "@/api/houseByIdApi";
import PrimaryButton from "@/components/utility/PrimaryButton.vue";
import HouseDetail from "@/components/HouseDetail.vue";
//import { useRoute } from "vue-router";

//const route = useRoute();
//const id = route?.params?.id ?? "2";
const houses = ref([]);
const house = ref([]);
const houseLoaded = ref(false);
const houseDetail = ref("");
onMounted(async () => {
  houses.value = await getHouses();
  const data = await getHouseById(2);
  house.value = data[0];
  console.log("house to be passed: " + JSON.stringify(house.value));
  console.log("house to be passed: " + house.value.id);
  await nextTick();
  houseLoaded.value = true;
  houseDetail.value = `<HouseDetail :house="house.value" />`;
});
// var isFetched = true;
</script>
<style scoped lang="scss">
@import "@/styles/pages.scss";
.section-detail-1 {
  margin-top: 1.5em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  display: flex;
}
.btn {
  padding-left: 0;
}

.section-detail-2 {
  display: flex;
  padding-bottom: 0.5em;
  justify-content: space-between;
  gap: 1em;
}

.rec-list {
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.rec-list .header-2 {
  text-align: left;
}
</style>
