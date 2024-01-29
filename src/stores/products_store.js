import { defineStore } from "pinia";
import { useStorage } from "vue3-storage";
import Products from "assets/products.json";
import Categories from "assets/categories.json";
import Cart from "assets/cart.json";
import User from "assets/users.json";
import Order from "assets/order.json";

export const useProductsStore = defineStore("ProductsStore", {
  state: () => ({
    AllProducts: Products,
    tempProduct: [],
    currentProducts: [],
    totalPage: 0,
    categories: [],
    cart: [],
    listFilter: [],
    order: [],
    limit: 10,
    isSearch: false,
    isCategory: false,
    isFilter: false,
  }),
  getters: {},
  actions: {
    getAllProducts(page) {
      const storageLocal = useStorage();
      const storageProducts = storageLocal.getStorageSync("products");
      if (storageProducts == null) {
        storageLocal.setStorageSync("products", Products);
        this.AllProducts = Products;
      } else {
        // this.AllProducts = storageProducts;
        this.totalPage = Math.ceil(this.AllProducts.length / this.limit);
        this.currentProducts = this.AllProducts.slice(
          (page - 1) * this.limit,
          page * this.limit
        );
      }
    },
    getAllCategories() {
      this.categories = Categories;
      this.listFilter = Categories.filter((cate) => cate.id !== 0).map(
        (cate) => ({
          label: cate.title,
          value: cate.id,
          color: "teal",
        })
      );
    },
    getProductsBtCategory(id) {
      this.AllProducts =
        id == 0
          ? useStorage().getStorageSync("products")
          : useStorage()
              .getStorageSync("products")
              .filter((pro) => pro.category === id);
      this.getAllProducts(1);
    },
    getProductsByFilter(options) {
      this.isFilter = true;
      this.isFilter = options.length > 0 ? true : false;
      if (!this.isSearch) {
        this.AllProducts = useStorage().getStorageSync("products");
      } else {
        this.AllProducts = this.tempProduct;
      }
      if (this.isFilter) {
        var temp = this.AllProducts;
        this.AllProducts = [];
        options.forEach((opValue) => {
          temp.map((pro) => {
            if (pro.category === opValue) {
              this.AllProducts.push(pro);
            }
          });
        });
      }
      this.getAllProducts(1);
    },
    searchProducts(text) {
      this.isFilter = false;
      this.AllProducts = useStorage()
        .getStorageSync("products")
        .filter((pro) => {
          const matches = pro.title.match(new RegExp(text, "gi"));
          return matches !== null && matches.length > 0;
        });
      this.tempProduct = this.AllProducts;
      this.getAllProducts(1);
    },
    suggestSearch(text) {
      return useStorage()
        .getStorageSync("products")
        .filter((pro) => {
          const matches = pro.title.match(new RegExp(text, "gi"));
          return matches !== null && matches.length > 0;
        });
    },
    SortByPrice(isAsc) {
      if (isAsc) {
        this.AllProducts.sort((a, b) => a.price - b.price).reverse();
      }
      if (isAsc == false) {
        this.AllProducts.sort((a, b) => a.price - b.price);
      }
      this.getAllProducts(1);
    },
    getProductById(id) {
      return useStorage()
        .getStorageSync("products")
        .find((pro) => pro.id === id);
    },
    getCart() {
      const storageLocal = useStorage();
      const storageCurentUser = storageLocal.getStorageSync("currentUser");
      const user = User.find(
        (u) => u.accessToken === storageCurentUser.accessToken
      );
      if (user) {
        const storageCurentCart = storageLocal.getStorageSync("cart");
        if (storageCurentCart == null) {
          this.cart = Cart.find((cart) => cart.userId === user.id).products;
          storageLocal.setStorageSync("cart", this.cart);
        } else {
          this.cart = storageLocal.getStorageSync("cart");
        }
      }
    },
    addToCart(id, quantity) {
      const product = this.cart.find((item) => item.id === id);
      const info = this.AllProducts.find((item) => item.id === id);
      if (!product) {
        this.cart.unshift({
          id: id,
          quantity: quantity > info.stock ? info.stock : quantity,
          selected: false,
        });
      } else {
        this.cart.map((item) => {
          if (item.id === id) {
            item.quantity += Number(quantity);
            if (item.quantity > info.stock) item.quantity = info.stock;
          }
        });
      }
      useStorage().setStorageSync("cart", this.cart);
    },
    sumPriceInCart() {
      var sum = 0;
      this.cart.map((item) => {
        if (item.selected) {
          const product = this.getProductById(item.id);
          if (product) {
            sum += product.price * item.quantity;
          }
        }
      });
      return sum;
    },
    sumQuantityInCart() {
      var sum = 0;
      this.cart.map((item) => {
        if (item.selected) {
          sum += Number(item.quantity);
        }
      });
      return sum;
    },
    removeProductInCart(id) {
      this.cart = this.cart.filter((item) => item.id != id);
    },
    getOrder() {
      const storageLocal = useStorage();
      const storageCurentUser = storageLocal.getStorageSync("currentUser");
      const user = User.find(
        (u) => u.accessToken === storageCurentUser.accessToken
      );
      if (user) {
        const storageCurentOrder = storageLocal.getStorageSync("order");
        if (storageCurentOrder == null) {
          this.order = Order.filter((o) => o.userId === user.id);
          storageLocal.setStorageSync("order", this.order);
        } else {
          this.order = storageLocal.getStorageSync("order");
        }
      }
    },
    createOrder() {
      const storageLocal = useStorage();
      const storageCurentUser = storageLocal.getStorageSync("currentUser");
      const uid = User.find(
        (u) => u.accessToken === storageCurentUser.accessToken
      ).id;
      const date = new Date().toLocaleDateString("en-GB");
      const id = this.order.at(-1).id + 2;
      setTimeout(() => {
        this.order.unshift({
          id: id,
          userId: uid,
          createdAt: date,
          orders: this.cart.filter((item) => item.selected === true),
          price: this.sumPriceInCart(),
        });
        this.cart.map((item) => {
          if (item.selected) {
            this.AllProducts.map((product) => {
              if (product.id === item.id) {
                product.stock -= item.quantity;
              }
            });
          }
        });
        useStorage().setStorageSync("products", this.AllProducts);
        this.cart = this.cart.filter((item) => item.selected === false);
        storageLocal.setStorageSync("order", this.order);
        storageLocal.setStorageSync("cart", this.cart);
      }, 1000);
    },
    uploadCSV(data) {
      data.pop();
      data.map((item) => {
        item.images = item.images.split(",");
      });
      const rs = Products.concat(data);
      console.log(rs);
      useStorage().setStorageSync("products", rs);
      this.AllProducts = rs;
    },
  },
});
