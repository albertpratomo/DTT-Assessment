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
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <!-- <div class="input">
        <label>Street name*</label>
        <input
          type="text"
          placeholder="Enter the street name"
          required
          v-model="streetname"
        />
      </div>

      <div class="row">
        <div class="input">
          <label>House number*</label>
          <input
            type="text"
            placeholder="Enter house number"
            required
            v-model="housenumber"
          />
        </div>

        <div class="input">
          <label>Addition (optional)</label>
          <input type="text" placeholder="e.g. A" v-model="addition" />
        </div>
      </div>
      <div class="input">
        <label>Postal code*</label>
        <input
          type="text"
          placeholder="e.g. 1000 AA"
          required
          v-model="postalcode"
        />
      </div>

      <div class="input">
        <label>City*</label>
        <input type="text" placeholder="e.g. Utrecht" required v-model="city" />
      </div> -->
      <div class="input">
        Upload picture (PNG or JPG)*
        <label for="image">
          <div
            :class="['upload-button', { preview: selectedImage }]"
            :style="{ backgroundImage: imagePreview }"
          >
            <img
              class="upload-icon"
              :style="{ display: !selectedImage ? 'block' : 'none' }"
              src="@/assets/image/ic_upload@3x.png"
              alt=""
            />
            <img
              class="cancel-button"
              v-if="selectedImage"
              src="@/assets/image/ic_clear_white@3x.png"
              alt=""
              @click="removeImage"
            /></div
        ></label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/png, image/jpeg"
          required
          @change="onFileChange"
        />
      </div>

      <!-- <div class="input">
        <label>Price*</label>
        <input
          type="text"
          placeholder="e.g. $150.000"
          required
          v-model="price"
        />
      </div>

      <div class="row">
        <div class="input">
          <label>Size*</label>
          <input type="text" placeholder="e.g. 60m2" required v-model="size" />
        </div>

        <div class="input">
          <label>Garage*</label>
          <select required v-model="garage">
            <option value="" disabled selected style="display: none">
              Select
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="input">
          <label>Bedrooms*</label>
          <input
            type="text"
            placeholder="Enter amount"
            required
            v-model="bedrooms"
          />
        </div>

        <div class="input">
          <label>Bathrooms*</label>
          <input
            type="text"
            placeholder="Enter amount"
            required
            v-model="bathrooms"
          />
        </div>
      </div>
      <div class="input">
        <label>Construction year*</label>
        <input
          type="text"
          placeholder="e.g. 1990"
          required
          v-model="constructionyear"
        />
      </div>

      <div class="input">
        <label>Description*</label>
        <textarea
          rows="4"
          placeholder="Enter Description"
          required
          v-model="description"
        ></textarea>
      </div> -->

      <ActionButton class="btn" type="submit">POST</ActionButton>
    </form>
  </div>
</template>
<script setup>
import ActionButton from "@/components/utility/ActionButton.vue";
//import InputField from "@/components/utility/InputField.vue";
import { ref } from "vue";
import { createHouse } from "@/api/createHouseApi";

const imagePreview = ref("");
const selectedImage = ref(null);
//Function to handle file change
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    selectedImage.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = `url('${e.target.result}')`;
    };
    reader.readAsDataURL(file);
  } else {
    selectedImage.value = null;
    imagePreview.value = "";
  }
};

// Function to remove the selected image
const removeImage = () => {
  selectedImage.value = null;
  imagePreview.value = "";
  // Reset the input file value to clear the selected file
  const inputElement = document.getElementById("image");
  if (inputElement) {
    inputElement.value = "";
  }
};
const streetname = ref("");
const housenumber = ref("");
const addition = ref("");
const postalcode = ref("");
const city = ref("");
const price = ref("");
const size = ref("");
const garage = ref("");
const bathrooms = ref("");
const bedrooms = ref("");
const constructionyear = ref("");
const description = ref("");
const submitForm = async () => {
  try {
    const formData = new FormData();
    formData.append("price", price.value);
    formData.append("bedrooms", bedrooms.value);
    formData.append("bathrooms", bathrooms.value);
    formData.append("size", size.value);
    formData.append("streetName", streetname.value);
    formData.append("houseNumber", housenumber.value);
    formData.append("numberAddition", addition.value);
    formData.append("zip", postalcode.value);
    formData.append("city", city.value);
    formData.append("constructionYear", constructionyear.value);
    formData.append("hasGarage", garage.value);
    formData.append("description", description.value);
    if (selectedImage.value) {
      formData.append("image", selectedImage.value);
      console.log("image appended!");
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await createHouse(formData);
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
.input {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 100%;
}
.input:hover {
  cursor: default;
}
input[type="file"] {
  display: none;
}
.upload-button {
  width: 30%;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed $tertiary-2-color;
  margin-top: 1em;
}
.preview {
  background-size: cover; //
  border-radius: 5px; //
  border: none; //
  position: relative; //
}
.upload-button img.upload-icon {
  width: 2em;
}

.upload-button img.cancel-button {
  width: 2em; //
  position: absolute; //
  top: -0.5em; //
  right: -0.6em; //
}
.upload-button:hover {
  cursor: pointer;
}
</style>
