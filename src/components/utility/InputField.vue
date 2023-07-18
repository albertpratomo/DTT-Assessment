<template>
  <div class="input" v-if="type == 'text' || type == 'number'">
    <label :for="inputId">{{ labelText }}</label>
    <input
      :type="type"
      :id="inputId"
      :name="inputId"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
  <div class="input" v-if="type == 'select'">
    <label :for="inputId">{{ labelText }}</label>
    <select
      :id="inputId"
      :name="inputId"
      :required="required"
      :disabled="disabled"
    >
      <option value="" disabled selected style="display: none">
        {{ placeholder }}
      </option>
      <option
        v-for="option in selectOptions"
        :key="option.label"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
  <div class="input" v-if="type === 'textarea'">
    <label :for="inputId">{{ labelText }}</label>
    <textarea
      :rows="textAreaRow"
      :id="inputId"
      :name="inputId"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :value="internalModelValue"
      @input="$emit('update:internalModelValue', $event.target.value)"
    ></textarea>
  </div>
  <div class="input" v-if="type == 'file'">
    {{ labelText }}
    <label :for="inputId">
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
      type="file"
      :id="inputId"
      :name="inputId"
      :accept="fileAccept"
      :required="required"
      :disabled="disabled"
      @change="onFileChange"
    />
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";

const props = defineProps({
  type: { type: String, default: "text" },
  label: String,
  required: { type: Boolean, default: false },
  placeholder: String,
  fileAccept: { type: String, default: "*/*" },
  disabled: { type: Boolean, default: false },
  textAreaRow: { type: Number, default: 4 },
  selectOptions: { type: Array, default: () => [] },
  modelValue: String,
});
defineEmits(["update:internalModelValue"]);
const internalModelValue = ref(props.modelValue);
const labelText = computed(() =>
  props.required ? props.label + "*" : props.label
);
const inputId = computed(() =>
  props.label.toLowerCase().replace(/[^a-z]/gi, "")
);
// Reactivity for the image preview and selected image file
const imagePreview = ref("");
const selectedImage = ref(null);
// Function to handle file change
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
  const inputElement = document.getElementById(inputId.value);
  if (inputElement) {
    inputElement.value = "";
  }
};
</script>
<style scoped lang="scss">
@import "@/styles/variables.scss";

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
