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
    <div class="header-1">
      {{ mode === "create" ? "Create new" : "Edit" }} listing
    </div>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <InputTextNumber
        placeholder="Enter the street name"
        label="Street name"
        required
        v-model="formData.streetname"
      />

      <div class="row">
        <InputTextNumber
          placeholder="Enter house number"
          label="House number"
          required
          v-model="formData.housenumber"
        />
        <InputTextNumber
          placeholder="e.g. A"
          label="Addition (optional)"
          v-model="formData.addition"
        />
      </div>
      <InputTextNumber
        placeholder="e.g. 1000 AA"
        label="Postal code"
        required
        v-model="formData.postalcode"
      />
      <InputTextNumber
        placeholder="e.g. Utrecht"
        label="City"
        required
        v-model="formData.city"
      />
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
      <InputTextNumber
        placeholder="e.g. €150.000"
        label="Price"
        required
        v-model="formData.price"
      />

      <div class="row">
        <InputTextNumber
          placeholder="e.g. 60m2"
          label="Size"
          required
          v-model="formData.size"
        />
        <InputSelect
          placeholder="Select"
          label="Garage"
          required
          v-model="formData.garage"
          :selectOptions="garageOptions"
        />
      </div>
      <div class="row">
        <InputTextNumber
          type="number"
          placeholder="Enter amount"
          label="Bedrooms"
          required
          v-model="formData.bedrooms"
        />
        <InputTextNumber
          type="number"
          placeholder="Enter amount"
          label="Bathrooms"
          required
          v-model="formData.bathrooms"
        />
      </div>
      <InputTextNumber
        type="number"
        placeholder="e.g. 1990"
        label="Construction year"
        required
        v-model="formData.constructionyear"
      />
      <InputTextArea
        placeholder="e.g. 1990"
        label="Description"
        required
        v-model="formData.description"
        rows="4"
      />

      <ActionButton class="btn" type="submit">POST</ActionButton>
    </form>
  </div>
</template>
<script setup>
import ActionButton from "@/components/utility/ActionButton.vue";
import InputTextNumber from "@/components/utility/InputTextNumber.vue";
import InputTextArea from "@/components/utility/InputTextArea.vue";
import InputSelect from "@/components/utility/InputSelect.vue";
import { ref, onMounted } from "vue";
//import { createHouse } from "@/api/createHouseApi";
import { getHouseById } from "@/api/houseByIdApi";
import { useRoute } from "vue-router";
const route = useRoute();

onMounted(() => {
  const id = route?.params?.id;

  if (id) {
    console.log("id: " + id);
    fetchFormData(id);
  }
});
const fetchFormData = async (id) => {
  try {
    const response = await getHouseById(id);
    console.log("response: ");
    console.log(response[0]);
    formData.constructionyear = response[0].constructionYear;
    formData.description = response[0].description;
    formData.garage = response[0].hasGarage;
    formData.city = response[0].location.city;
    formData.housenumber = response[0].location.houseNumber;
    formData.addition = response[0].location.houseNumberAddition;
    formData.streetname = response[0].location.street;
    formData.postalcode = response[0].location.zip;
    formData.price = response[0].price;
    formData.bathrooms = response[0].rooms.bathrooms;
    formData.bedrooms = response[0].rooms.bedrooms;
    formData.size = response[0].size;
    selectedImage.value = response[0].image;
    imagePreview.value = `url('${response[0].image}')`;
    mode.value = "edit";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const mode = ref("create"); // 'create' or 'edit'

const garageOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];
const imagePreview = ref("");
const selectedImage = ref(null);
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
const removeImage = () => {
  selectedImage.value = null;
  imagePreview.value = "";
  const inputElement = document.getElementById("image");
  if (inputElement) {
    inputElement.value = "";
  }
};
const formData = {
  streetname: "",
  housenumber: "",
  addition: "",
  postalcode: "",
  city: "",
  price: "",
  size: "",
  garage: "",
  bathrooms: "",
  bedrooms: "",
  constructionyear: "",
  description: "",
};

const submitForm = async () => {
  try {
    const formData1 = new FormData();
    formData1.append("price", formData.price);
    formData1.append("bedrooms", formData.bedrooms);
    formData1.append("bathrooms", formData.bathrooms);
    formData1.append("size", formData.size);
    formData1.append("streetName", formData.streetname);
    formData1.append("houseNumber", formData.housenumber);
    formData1.append("numberAddition", formData.addition);
    formData1.append("zip", formData.postalcode);
    formData1.append("city", formData.city);
    formData1.append("constructionYear", formData.constructionyear);
    formData1.append("hasGarage", formData.garage);
    formData1.append("description", formData.description);
    const formData2 = new FormData();
    if (selectedImage.value) {
      formData2.append("image", selectedImage.value);
      console.log("image value: " + selectedImage.value);
    }
    for (var pair of formData1.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    //await createHouse(formData1, formData2);
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
