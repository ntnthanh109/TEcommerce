<template>
  <div class="q-pa-md q-gutter-sm">
    <div v-for="item in store.cart">
      <CartItemInCartPage :product="store.getProductById(item.id)" :cart="item"/>
    </div>
    <div class="cart-page-footer">
      <q-checkbox v-model="clickAll"/>
      <span class="footer-total"> Tong so hang: <span>{{store.sumQuantityInCart()}}</span></span>
      <span class="footer-total"> Tong tien: <span>{{store.sumPriceInCart()}}$</span></span>
      <q-btn label="Thanh Toan" @click="createOrder"/>
    </div>
    <q-dialog v-model="alert">
      <q-card >
        <q-card-section class="q-pt-none dialog-content text-h6" align="center" style="margin-top:20px;">
          Successfull Orderment
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="teal" v-close-popup @click="$router.push('/order')"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { ref,watch } from 'vue'
import { useProductsStore } from 'src/stores/products_store'
import CardDetailProduct from 'src/components/CardDetailProduct.vue'
import CartItemInCartPage from 'src/components/CartItemInCartPage.vue'

export default {
  name: "CartPage",
  components:{
    CardDetailProduct,
    CartItemInCartPage
  },
  setup () {
    const store = useProductsStore()
    const clickAll = ref(false)
    watch(clickAll,()=>{
      if(clickAll.value){
        store.cart.map(item=>item.selected= true)
      }
      else{
        store.cart.map(item=>item.selected= false)
      }
    })
    return {
      slide: ref(1),
      val:ref(false),
      alert: ref(false),
      clickAll,
      store
    }
  },
  methods:{
    createOrder(){
      this.store.createOrder()
      this.alert = true
    }
  }

}
</script>
<style>
.cart-page-footer{
    display: flex;
    position: fixed;
    bottom: 0;
    left:0;
    margin: 0;
    background-color: #26A69A;
    width: 100%;
    color: white;
    padding: 10px 35px;
    align-items: center;
    justify-content: space-between;
}
</style>