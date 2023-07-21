<template>
  <div class="page-content">
    <div class="section-1">
      <router-link :to="lastRoute.fullPath">
        <ActionButton
          class="back-btn"
          type="label"
          prependIcon="ic_back_grey@3x.png"
          >Back to {{ lastRoute.name }}</ActionButton
        >
        <ActionButton class="mobile-back-btn" type="label"
          ><img
            style="width: 1.5em"
            src="@/assets/image/ic_back_grey@3x.png"
            alt=""
        /></ActionButton>
      </router-link>
      <div class="header-1">
        {{ mode === "create" ? "Create new" : "Edit" }} listing
      </div>
    </div>

    <form
      @submit.prevent="submitForm"
      method="POST"
      enctype="multipart/form-data"
    >
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
        placeholder="Enter description"
        label="Description"
        required
        v-model="formData.description"
        rows="4"
      />

      <ActionButton class="btn" @click="submitForm" :disabled="!isFormValid">{{
        mode === "create" ? "POST" : "SAVE"
      }}</ActionButton>
    </form>
  </div>
</template>
<script setup>
import ActionButton from "@/components/utility/ActionButton.vue";
import InputTextNumber from "@/components/utility/InputTextNumber.vue";
import InputTextArea from "@/components/utility/InputTextArea.vue";
import InputSelect from "@/components/utility/InputSelect.vue";
import { ref, onMounted, computed } from "vue";
import { createHouse } from "@/api/createHouseApi";
import { editHouse } from "@/api/editHouseApi";
import { getHouseById } from "@/api/getHouseByIdApi";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const lastRoute = computed(() => {
  const backUrl = router.options.history.state.back;
  const route = router.resolve({ path: `${backUrl}` });

  return route;
});

const route = useRoute();
const id = route?.params?.id;
onMounted(() => {
  if (id) {
    fetchFormData(id);
  }
});
const fetchFormData = async (id) => {
  try {
    const response = await getHouseById(id);
    formData.value.constructionyear = response[0].constructionYear;
    formData.value.description = response[0].description;
    formData.value.garage = response[0].hasGarage;
    formData.value.city = response[0].location.city;
    formData.value.housenumber = response[0].location.houseNumber;
    formData.value.addition = response[0].location.houseNumberAddition;
    formData.value.streetname = response[0].location.street;
    formData.value.postalcode = response[0].location.zip;
    formData.value.price = response[0].price;
    formData.value.bathrooms = response[0].rooms.bathrooms;
    formData.value.bedrooms = response[0].rooms.bedrooms;
    formData.value.size = response[0].size;
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
const formData = ref({
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
});
const isFormValid = computed(() => {
  const formDataValid = ref(null);
  // for (const field in formData.value) {
  //   if (Object.prototype.hasOwnProperty.call(formData.value, field)) {
  //     if (!formData.value[field].trim() || formData.value[field].required) {
  //       return false;
  //     }
  //   }
  // }
  formDataValid.value = true;
  if (formDataValid.value) {
    if (!selectedImage.value) {
      return false;
    }
  }
  return true;
});
const submitForm = async () => {
  if (isFormValid.value == true) {
    try {
      const formData1 = new FormData();
      formData1.append("price", formData.value.price);
      formData1.append("bedrooms", formData.value.bedrooms);
      formData1.append("bathrooms", formData.value.bathrooms);
      formData1.append("size", formData.value.size);
      formData1.append("streetName", formData.value.streetname);
      formData1.append("houseNumber", formData.value.housenumber);
      formData1.append("numberAddition", formData.value.addition);
      formData1.append("zip", formData.value.postalcode);
      formData1.append("city", formData.value.city);
      formData1.append("constructionYear", formData.value.constructionyear);
      formData1.append("hasGarage", formData.value.garage);
      formData1.append("description", formData.value.description);
      const formData2 = new FormData();
      if (selectedImage.value) {
        formData2.append("image", selectedImage.value);
        console.log("image value: " + selectedImage.value.name);
        const imageFile = formData2.get("image");
        if (imageFile instanceof File) {
          console.log("Image name: " + imageFile.name);
        } else {
          console.log("No image selected.");
        }
      }

      if (id) {
        try {
          await editHouse(id, formData1, formData2);
          router.push("/detail/" + id);
        } catch (error) {
          console.error(error);
          throw error;
        }
      } else {
        try {
          await createHouse(formData1, formData2);
          router.push("/detail/" + id);
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    } catch (error) {
      console.error("Error creating/editing house:", error.message);
    }
    console.log("Form is valid. Submitting...");
  } else {
    console.log("Form is not valid. Cannot submit.");
  }
};
</script>
<style scoped lang="scss">
@import "@/styles/pages.scss";
.back-btn {
  padding-left: 0;
  @include sm {
    display: none;
  }
}
.mobile-back-btn {
  display: none;
  padding-left: 0;
  @include sm {
    display: block;
  }
}
.page-content {
  text-align: left;
  background: url("@/assets/image/img_background@3x.jpg");
  background-size: cover;
}
.section-1 {
  display: flex;
  gap: 0.5em;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 1.5em;
  @include sm {
    flex-direction: row;
    gap: 0;
    align-items: center;
    padding: 0;
  }
}
.section-1 .header-1 {
  flex-grow: 1;
  text-align: center;
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
  @include lg {
    width: 60%;
  }
  @include sm {
    width: 100%;
  }
}
.row {
  display: flex;
  justify-content: space-between;
  gap: 1em;
  align-items: center;
}
.row > div {
  @include rwd(1087) {
    width: 47%;
  }
}
.btn {
  width: fit-content;
  padding-left: 3em;
  padding-right: 3em;
  align-self: flex-end;
  @include sm {
    width: 100%;
  }
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
