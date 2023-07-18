<template>
  <button :class="buttonClass" @click="handleClick">
    <slot name="prepend-icon">
      <span v-if="prependIcon" class="button-icon prepend-icon">
        <img :src="prependSrc" />
      </span>
    </slot>
    <slot></slot>
    <slot name="append-icon">
      <span v-if="appendIcon" class="button-icon append-icon">
        <img :src="appendSrc" />
      </span>
    </slot>
  </button>
</template>

<script setup>
import { ref, onMounted, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  prependIcon: {
    type: String,
  },
  appendIcon: {
    type: String,
  },
});

const buttonClass = computed(() => [
  "button",
  `button-${props.type}`,
  {
    "button-disabled": props.disabled,
  },
]);

const emit = defineEmits(["click"]);

function handleClick() {
  if (!props.disabled) {
    emit("click");
  }
}

const prependSrc = ref("");
const appendSrc = ref("");

onMounted(async () => {
  if (props.prependIcon) {
    // Dynamically import the image
    prependSrc.value = (
      await import("@/assets/image/" + props.prependIcon)
    ).default;
  }
  if (props.appendIcon) {
    // Dynamically import the image
    appendSrc.value = (
      await import("@/assets/image/" + props.appendIcon)
    ).default;
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
}

.button-primary {
  background-color: $primary-color;
  color: #fff;
}

.button-secondary {
  background-color: $secondary-color;
  color: #fff;
}

.button-label {
  color: $primary-text-color;
  background: none;
}

.button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.prepend-icon,
.append-icon {
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
  margin-left: 4px;
}
.prepend-icon img,
.append-icon img {
  width: 1em;
}
</style>
