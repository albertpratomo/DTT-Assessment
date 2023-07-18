<template>
  <div>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <h3>Delete listing</h3>
        <div class="modal-body">
          <p>
            Are you sure you want to delete this listing? This action cannot be
            undone.
          </p>
          <div class="actions">
            <ActionButton @click="modal.close()">YES, DELETE</ActionButton>
            <ActionButton type="secondary" @click="modal.close()"
              >GO BACK</ActionButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ActionButton from "@/components/utility/ActionButton.vue";
import { storeToRefs } from "pinia";
import { useModal } from "@/stores/modal";

const modal = useModal();

// convert all state properties to reactive references to be used on view
const { isOpen } = storeToRefs(modal);
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
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
</style>
