<template>
  <div class="page-content">
    <div class="section-detail-1">
      <router-link to="/">
        <div class="back-button">
          <img src="@/assets/image/ic_back_grey@3x.png" alt="" />
          <p>Back to overview</p>
        </div>
      </router-link>
    </div>
    <div class="header-1">Create new listing</div>
    <form>
      <div class="input">
        <label for="streetname">Street name*</label>
        <input
          type="text"
          id="streetname"
          name="streetname"
          placeholder="Enter the street name"
        />
      </div>
      <div class="row">
        <div class="input">
          <label for="housenumber">House number*</label>
          <input
            type="text"
            id="housenumber"
            name="housenumber"
            placeholder="Enter house number"
          />
        </div>
        <div class="input">
          <label for="addition">Addition (optional)</label>
          <input
            type="text"
            id="addition"
            name="addition"
            placeholder="e.g. A"
          />
        </div>
      </div>
      <div class="input">
        <label for="postalcode">Postal code*</label>
        <input
          type="text"
          id="postalcode"
          name="postalcode"
          placeholder="e.g. 1000 AA"
        />
      </div>
      <div class="input">
        <label for="city">City*</label>
        <input type="text" id="city" name="city" placeholder="e.g. Utrecht" />
      </div>
      <div class="input">
        Upload picture (PNG or JPG)*
        <label for="picture">
          <div class="upload-button">
            <img
              class="upload-icon"
              src="@/assets/image/ic_upload@3x.png"
              alt=""
            />
            <img
              class="cancel-button"
              src="@/assets/image/ic_clear_white@3x.png"
              alt=""
            /></div
        ></label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/png, image/jpeg"
          disabled
        />
      </div>
      <div class="input">
        <label for="price">Price*</label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="e.g. $150.000"
        />
      </div>
      <div class="row">
        <div class="input">
          <label for="size">Size*</label>
          <input type="text" id="size" name="size" placeholder="e.g. 60m2" />
        </div>
        <div class="input">
          <label for="garage">Garage*</label>
          <input type="text" id="garage" name="garage" placeholder="Select" />
        </div>
      </div>
      <div class="row">
        <div class="input">
          <label for="bedrooms">Bedrooms*</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            placeholder="Enter amount"
          />
        </div>
        <div class="input">
          <label for="bathrooms">Bathrooms*</label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            placeholder="Enter amount"
          />
        </div>
      </div>
      <div class="input">
        <label for="constructiondate">Construction date*</label>
        <input
          type="text"
          id="constructiondate"
          name="constructiondate"
          placeholder="e.g. 1990"
        />
      </div>
      <div class="input">
        <label for="description">Description*</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Enter Description"
        />
      </div>
      <PrimaryButton class="btn">POST</PrimaryButton>
    </form>
  </div>
</template>
<script setup>
import PrimaryButton from "@/components/utility/PrimaryButton.vue";
</script>
<style scoped lang="scss">
@import "@/styles/pages.scss";
input[type="file"] {
  display: none;
}
.page-content {
  text-align: left;
  padding-bottom: 2em;
  background: url("@/assets/image/img_background@3x.jpg");
  background-size: cover;
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
.input {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 100%;
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
input {
  background: white;
}
.upload-button {
  width: 30%;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed $tertiary-2-color;
  margin-top: 1em;
  background: url("@/assets/image/img_placeholder_house@3x.png"); //
  background-size: cover; //
  border-radius: 5px; //
  border: none; //
  position: relative; //
}
.upload-button img.upload-icon {
  width: 2em;
  display: none; //
}

.upload-button img.cancel-button {
  width: 2em; //
  position: absolute; //
  top: -0.5em; //
  right: -0.6em; //
  display: none;
}

.input:hover {
  cursor: default;
}
.upload-button:hover {
  cursor: pointer;
}
</style>
