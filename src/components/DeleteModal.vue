<template>
  <div>
    <div v-if="isOpen" class="modal-overlay" @click="modal.close">
      <div class="modal-content">
        <img v-if="icon" :src="require(`@/assets/image/${icon}`)" alt="" />
        <h3>{{ title }}</h3>
        <div class="modal-body">
          <p>
            {{ text }}
          </p>
          <div class="actions">
            <ActionButton
              v-for="action in actions"
              @click="action.callback(model)"
              :key="action.name"
              :type="action.btnType"
              >{{ action.label }}</ActionButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ActionButton from "@/components/utility/ActionButton.vue";
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useModal } from "@/stores/modal";

const modal = useModal();
const model = reactive({});
const { isOpen, actions, title, text, icon } = storeToRefs(modal);
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.modal-body {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
.modal-body p {
  font-family: $secondary-font;
  color: $secondary-text-color;
  font-size: 12px;
}
.actions {
  margin-top: 2em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: center;
}
.actions > button {
  width: 100%;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin: 1em;
}
.modal-content img {
  width: 4em;
  margin: 2em 6em;
  margin-bottom: 0;
}
</style>
