
import { defineStore } from "pinia";

export const useModal = defineStore("modal", {
  state: () => ({
    isOpen: false,
    actions: [],
    title:"",
    text:"",
    icon:""
  }),
  actions: {
    open(title,text,icon,actions) {
      this.isOpen = true;
      this.actions = actions;
      this.title=title;
      this.text=text;
      this.icon=icon;
    },
    close() {
      this.isOpen = false;
      this.actions = [];
    },
  },
});

export default useModal;