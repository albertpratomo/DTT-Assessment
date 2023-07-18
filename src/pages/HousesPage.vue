<template>
  <div class="page-content">
    <div class="section-1">
      <h1 class="header-1">Houses</h1>

      <router-link to="/mylistingform">
        <ActionButton prependIcon="ic_plus_white@3x.png"
          >CREATE NEW</ActionButton
        >
      </router-link>
    </div>
    <div class="section-2">
      <SearchBar />
      <div class="sort">
        <button class="col-price">Price</button>
        <button class="col-size">Size</button>
      </div>
    </div>
    <div class="section-3">
      <Suspense>
        <template #default>
          <div>
            <HouseCard v-for="house in houses" :key="house.id" :house="house" />
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
import SearchBar from "@/components/utility/SearchBar.vue";
import ActionButton from "@/components/utility/ActionButton.vue";
import { getHouses } from "@/api/housesApi";
import { ref } from "vue";

const houses = ref([]);

(async () => {
  houses.value = await getHouses();
})();

// const data = ref();

// onMounted(async () => {
//   try {
//     const response = await fetch(`https://api.intern.d-tt.nl/api/houses`, {
//       headers: {
//         "x-api-key": "UcZHkF9BCX8EG4qz1PNJg05ieQKSV7hL",
//       },
//     });
//     const jsonData = await response.json();
//     data.value = jsonData;
//console.log(data.value[0].id);
//   } catch (error) {
//     console.error(error);
//   }
// });
</script>
<style lang="scss">
@import "@/styles/pages.scss";
.section-1,
.section-2 {
  display: flex;
  justify-content: space-between;
  padding: 0 0;
  align-items: center;
}
.section-1 {
  margin-top: 1.5em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}
.section-2 {
  padding-bottom: 0.5em;
}
button:hover {
  cursor: pointer;
}
.btn {
  border: none;
  background: $primary-color;
  border-radius: 5px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  padding: 0.5em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
}
.btn img {
  width: 1em;
}
.btn p {
  margin: 0;
}

.sort {
  display: flex;
}
.col-price {
  background: $primary-color;
  color: white;
  font-size: 14px;
  padding: 0.5em 3.5em;
  border-radius: 5px 0 0 5px;
}
.col-size {
  background: $tertiary-2-color;
  color: white;
  font-size: 14px;
  border-radius: 0 5px 5px 0;
  padding: 0.5em 3.5em;
}

.section-3 {
  padding: 1em 0;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
