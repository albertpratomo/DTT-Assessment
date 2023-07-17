// import { defineStore } from 'pinia'
// import { getHouseById } from "@/api/houseByIdApi";
// export const useHouseDetailStore = defineStore("housedetail", {
//     state: () => ({
//         house : Object,
//     }),
//     getters: {
//       getHouseById(state){
//           return state.house
//         }
//     },
//     actions: {
//       async fetchUsers() {
//         try {
//           const data = await axios.get('https://jsonplaceholder.typicode.com/users')
//             this.users = data.data
//           }
//           catch (error) {
//             alert(error)
//             console.log(error)
//         }
//       }
//     },
// })