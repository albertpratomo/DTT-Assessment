<template>
  <div class="page-content">
    <div class="section-1">
      <router-link to="/">
        <ActionButton
          class="back-btn"
          type="label"
          prependIcon="ic_back_grey@3x.png"
          >Back to overview</ActionButton
        >
      </router-link>
    </div>
    <div class="header-1">Create new listing</div>
    <form @submit.prevent="submitForm">
      <!-- <InputField
        v-model="streetname"
        label="Street name"
        required
        placeholder="Enter the street name"
      /> -->
      <div class="row">
        <!-- <InputField
          v-model="housenumber"
          label="House number"
          required
          placeholder="Enter house number"
        />
        <InputField
          v-model="additionoptional"
          label="Addition (optional)"
          placeholder="e.g. A"
        /> -->
      </div>
      <!-- <InputField
        label="Postal code"
        v-model="postalcode"
        required
        placeholder="e.g. 1000 AA"
      />
      <InputField
        v-model="city"
        label="City"
        required
        placeholder="e.g. Utrecht"
      /> -->
      <!-- <InputField
        label="Upload picture (PNG or JPG)"
        type="file"
        fileAccept="image/png, image/jpeg"
        required
        v-model="image"
      /> -->
      <!-- <InputField
        v-model="price"
        label="Price"
        required
        placeholder="e.g. $150.000"
      /> -->
      <div class="row">
        <!-- <InputField
          v-model="size"
          label="Size"
          required
          placeholder="e.g. 60m2"
        /> -->
        <!-- <InputField
          v-model="garage"
          label="Garage"
          required
          placeholder="Select"
          type="select"
          :selectOptions="garageOptions"
        /> -->
      </div>
      <div class="row">
        <InputField
          v-model="bedrooms"
          label="Bedrooms"
          required
          placeholder="Enter amount"
          type="number"
        />
        <InputField
          v-model="bathrooms"
          label="Bathrooms"
          type="number"
          required
          placeholder="Enter amount"
        />
      </div>
      <InputField
        v-model="constructionyear"
        label="Construction year"
        type="text"
        required
        placeholder="e.g. 1990"
      />
      <!-- <InputField
        :v-model="description"
        label="Description"
        type="textarea"
        required
        placeholder="Enter Description"
      /> -->

      <ActionButton class="btn" type="submit">POST</ActionButton>
    </form>
  </div>
</template>
<script setup>
import ActionButton from "@/components/utility/ActionButton.vue";
import InputField from "@/components/utility/InputField.vue";
import { ref } from "vue";
//import { createHouse } from "@/api/createHouseApi";
// const garageOptions = [
//   { label: "Yes", value: true },
//   { label: "No", value: false },
// ];
const bedrooms = ref("");
const garage = ref("");
const submitForm = async () => {
  try {
    // console.log("FORM 01: " + JSON.stringify(form.value));
    console.log("DESC = " + bedrooms.value);
    const formData = new FormData();
    // formData.append("price", houseData.price);
    // formData.append("bedrooms", houseData.bedrooms);
    // formData.append("bathrooms", houseData.bathrooms);
    // formData.append("size", houseData.size);
    // formData.append("streetName", houseData.streetname);
    // formData.append("houseNumber", houseData.housenumber);
    // formData.append("numberAddition", houseData.additionoptional);
    // formData.append("zip", houseData.postalcode);
    // formData.append("city", houseData.city);
    // formData.append("constructionYear", houseData.constructionyear);
    // formData.append("hasGarage", houseData.garage);
    formData.append("bedrooms", bedrooms.value);
    formData.append("hasGarage", garage.value);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // const createdHouse = await createHouse(form.value);
    // console.log("House created:", createdHouse);
  } catch (error) {
    console.error("Error creating house:", error.message);
  }
};
</script>
<style scoped lang="scss">
@import "@/styles/pages.scss";
.back-btn {
  padding-left: 0;
}
.page-content {
  text-align: left;
  padding-bottom: 2em;
  background: url("@/assets/image/img_background@3x.jpg");
  background-size: cover;
  margin-top: 0.5em;
}
.section-1 {
  margin-bottom: 0.5em;
}
form {
  margin-top: 2em;
  font-size: 14px;
  font-weight: 600;
  color: $secondary-text-color;
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 1em;
}
.btn {
  width: fit-content;
  padding-left: 3em;
  padding-right: 3em;
  align-self: flex-end;
}
</style>
