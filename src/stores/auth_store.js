import { defineStore } from "pinia";
import { useStorage } from "vue3-storage";
import usersData from "assets/users.json";

export const authStore = defineStore("authStore", {
  state: () => ({
    currentUser: { userName: "", accessToken: "", error: "", admin: false },
  }),

  getters: {
    getCurrentUser(state) {
      if (state.currentUser.userName == "") {
        const storageLocal = useStorage();
        const storageCurentUser = storageLocal.getStorageSync("currentUser");
        if (storageCurentUser != null && storageCurentUser.userName != "")
          state.currentUser = storageCurentUser;
      }
      return state.currentUser;
    },
    getAccessToken(state) {
      return state.currentUser.accessToken;
    },
  },

  actions: {
    login(email, pass) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userTemp = usersData.find((user) => {
            return user.email === email;
          });
          if (userTemp) {
            if (userTemp.password === pass) {
              const isAdmin = userTemp.admin;
              const storage = useStorage();
              storage.setStorageSync("currentUser", {
                userName: email,
                accessToken: userTemp.accessToken,
                error: "",
                admin: isAdmin,
              });
              this.currentUser = {
                userName: email,
                accessToken: userTemp.accessToken,
                error: "",
                admin: isAdmin,
              };
              resolve({
                userName: email,
                accessToken: userTemp.accessToken,
                error: "",
                admin: isAdmin,
              });
            } else {
              reject({
                userName: "",
                accessToken: "",
                error: "Password not match",
              });
            }
          } else {
            reject({ userName: "", accessToken: "", error: "Invalid User" });
          }
          return;
        }, 500);
      });
    },
    signup(email, pass) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userTemp = usersData.find((user) => {
            return user.email === email;
          });
          if (!userTemp) {
            console.log("ba");
            usersData.push({
              email: email,
              password: pass,
              accessToken: `qwertyuiopoooo${email}`,
            });
            resolve({
              error: "",
            });
          } else {
            reject({ error: "Email is existed" });
          }
          return;
        }, 500);
      });
    },
    logout() {
      const storage = useStorage();

      storage.setStorageSync("currentUser", {
        userName: "",
        accessToken: "",
        error: "logout",
        admin: false,
      });
      this.currentUser = {
        userName: "",
        accessToken: "",
        error: "logout",
        admin: false,
      };
      storage.setStorageSync("order", null);
      storage.setStorageSync("cart", null);
    },
  },
});
