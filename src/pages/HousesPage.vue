<template>
  <div class="page-content">
    <div class="section-1">
      <h1 class="header-1">Houses</h1>

      <router-link to="/create">
        <ActionButton class="add-btn-desktop" prependIcon="ic_plus_white@3x.png"
          >CREATE NEW</ActionButton
        >
        <ActionButton class="add-btn-mobile" type="label"
          ><img
            style="width: 1.5em"
            src="@/assets/image/ic_plus_grey@3x.png"
            alt=""
        /></ActionButton>
      </router-link>
    </div>
    <div class="section-2">
      <SearchBar v-model="searchQuery" class="searchbar" />
      <ToggleButton
        class="sort"
        :options="sortOptions"
        @update="handleActiveButtonChange"
      />
    </div>
    <div class="section-3">
      <div class="result-number" v-if="searchQuery && filteredList().length">
        <h3>{{ filteredList().length }} results found</h3>
      </div>
      <div class="no-result" v-if="searchQuery && !filteredList().length">
        <img src="@/assets/image/img_empty_houses@3x.png" alt="" />
        <p>No results found.<br />Please try another keyword.</p>
      </div>
      <Suspense>
        <template #default>
          <div>
            <HouseCard
              v-for="house in filteredList()"
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
import SearchBar from "@/components/utility/SearchBar.vue";
import ActionButton from "@/components/utility/ActionButton.vue";
import ToggleButton from "@/components/utility/ToggleButton.vue";
import { getHouses } from "@/api/housesApi";
import { ref } from "vue";
const searchQuery = ref("");
const sortOptions = ["Price", "Size"];
const houses = ref([]);
const list = ref([]);
const activeButton = ref("");
const handleActiveButtonChange = (button) => {
  activeButton.value = button;
  if (button == "Price") {
    sortHousesByPrice();
  } else {
    sortHousesBySize();
  }
};
const sortHousesByPrice = () => {
  houses.value.sort((a, b) => a.price - b.price);
};
const sortHousesBySize = () => {
  houses.value.sort((a, b) => a.size - b.size);
};
(async () => {
  houses.value = await getHouses();
  list.value = houses.value;
  sortHousesByPrice();
})();

function filteredList() {
  const query = searchQuery.value.toLowerCase();
  const res = houses.value.filter((house) =>
    house.location.street.toLowerCase().includes(query)
  );
  const temp = JSON.stringify(res);
  return JSON.parse(temp);
}

const handleHouseDeleted = async () => {
  houses.value = await getHouses();
  console.log("House deleted. Reloading house list...");
};
</script>
<style lang="scss">
@import "@/styles/pages.scss";
.result-number {
  text-align: left;
}
.result-number h3 {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  @include sm {
    font-size: 14px;
  }
}
.section-1,
.section-2 {
  display: flex;
  justify-content: space-between;
  padding: 0 0;
  align-items: center;
}
.section-1 .header-1 {
  @include sm {
    flex-grow: 1;
  }
}
.add-btn-mobile.button {
  padding-right: 0;
  display: none;
  @include sm {
    display: flex;
  }
}
.add-btn-desktop.button {
  @include sm {
    display: none;
  }
}
.searchbar,
.sort {
  @include sm {
    width: 100%;
  }
}
.section-1 {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}
.section-2 {
  padding-bottom: 0.5em;
  @include sm {
    flex-direction: column;
    gap: 1em;
  }
}
.section-3 {
  padding: 1em 0;
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex-grow: 1;
  justify-content: center;
}
.no-result img {
  width: 30%;
  @include sm {
    width: 60%;
  }
}
</style>
