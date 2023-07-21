<template>
  <div class="page-content">
    <div class="page-title header-1">My Listings</div>
    <div class="section">
      <Suspense>
        <template #default>
          <div>
            <HouseCard
              v-for="house in houses"
              :key="house.id"
              :house="house"
              @houseDeleted="handleHouseDeleted"
            />
          </div>
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>
<script setup>
import HouseCard from "@/components/utility/HouseCard.vue";
import { getMyHouses } from "@/api/myHouseApi";
import { ref } from "vue";
const houses = ref([]);
(async () => {
  houses.value = await getMyHouses();
})();
const handleHouseDeleted = async () => {
  houses.value = await getMyHouses();
  console.log("House deleted. Reloading house list...");
};
</script>
<style lang="scss" scoped>
@import "@/styles/pages.scss";
.section-3 {
  padding: 1em 0;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
}
.page-title {
  display: none;
  @include sm {
    text-align: center;
    display: block;
    margin-top: 1em;
    margin-bottom: 1em;
  }
}
</style>
