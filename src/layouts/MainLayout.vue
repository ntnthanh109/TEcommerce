<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-teal"> 
        <q-toolbar-title >
          <router-link to="/" style="text-decoration: none;color: white;">
            2NTshop
          </router-link >
        </q-toolbar-title>
        <q-input dark dense standout v-model="text"  @keyup.enter="onSearch(text)" input-class="text-right" class="q-ml-md" style="width: 50%;margin-right: 10px;">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
          <div class="suggestSearch" v-if="isSuggest" >
            <q-list style="background-color: white;width: 100%;top: 100px;">
              <q-item clickable v-for="s in ProStore.suggestSearch(text)" @click="onSearch(s.title)">
                  {{ s.title }}
              </q-item>
            </q-list>
          </div>
        </q-input>
        <q-btn flat icon="shopping_cart" round>
          <q-badge floating color="red" :label="ProStore.cart.length" rounded />
          <q-menu
            transition-show="jump-down"
            transition-hide="jump-up"
          >
          <q-list style="min-width: 100px">
              <q-item clickable v-for="cart in ProStore.cart.slice(0,4)">
                  <CartItem :cart="ProStore.getProductById(cart.id)"/>
                </q-item>
            </q-list>
            <q-separator />
            <div  style="text-align: center;">
              <router-link to="/cart">
                see more...
              </router-link >
            </div>
          </q-menu>
        </q-btn>
        <q-btn flat round icon="shopping_bag" to="/order">
          <q-badge floating color="red" :label="ProStore.order.length" rounded />
        </q-btn>
        <q-btn flat round icon="account_circle" >
          <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
          >
          <q-list style="min-width: 100px">
            <q-item clickable @click="handleLogout">
              <q-item-section>Log Out</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container style="background-color: rgb(221, 217, 217);">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent,ref,watch,onMounted } from 'vue'
import { authStore } from 'src/stores/auth_store';
import { useProductsStore } from 'src/stores/products_store';
import CartItem from 'src/components/CartItem.vue';

export default defineComponent({
  name: 'MainLayout',
  components:{
    CartItem
  },
  setup () {
    const store = authStore()
    const ProStore = useProductsStore()
    const text = ref('')
    const isSuggest = ref(false)
    onMounted(()=>{
      ProStore.getCart()
      ProStore.getOrder()
    })
    watch(text,()=>{
      isSuggest.value = true
    })
    return {
      store,
      ProStore,
      text,
      isSuggest
    }
  },
  methods:{
    handleLogout(){
      this.store.logout()
      this.$router.push('/signin')
    },
    onSearch(text){
      this.ProStore.filterSelected = []
      this.isSuggest = false
      this.ProStore.isSearch = true
      this.ProStore.isCategory = false
      this.ProStore.searchProducts(text)
      
    }
  }
})
</script>
<style scoped>
.suggestSearch{
  background-color: white;
  position: absolute;
  top: 46px;
  width: 100%;
  z-index: 1;
}
</style>