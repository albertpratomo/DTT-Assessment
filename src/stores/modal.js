
import { defineStore } from "pinia";
// import {deleteHouse} from "@/api/deleteHouseApi";
export const useModal = defineStore("modal", {
  state: () => ({
    isOpen: false,
    // id:null
  }),
  actions: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
      // this.id=null;
    },
    // async delete() {
    //   try {
    //     if (!this.id) {
    //       throw new Error('House ID not provided.');
    //     }
    //     // Call the API method to delete the house with the given ID
    //     const response = await deleteHouse(this.id);

    //     // Handle the response or any additional logic, if needed
    //     console.log("House deleted successfully:", response.status);

    //     this.closeModal();
    //   } catch (error) {
    //     // Handle the error, display a notification, etc.
    //     console.error("Error deleting house:", error);
    //   }
    // },
    // init(id) {
    //   this.id = id;
    // },
  },
});
