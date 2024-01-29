<template>
  <q-card flat bordered style="max-width: 800px;">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Product Detail</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section  style="padding: 20px;">
      <q-carousel class="carousel" 
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      >
        <q-carousel-slide v-for="(img,index) in product.images" :name="index" :img-src="img" loading="lazy"
        spinner-color="teal"/>
      </q-carousel>
      <q-card-section>
        <h4 style="margin-top: 0;">{{product.title}}</h4>
        <p>
          {{product.description}}
        </p>
        <p>Price:  <span style="color: orange;">{{product.price}}$</span></p>
        <p>Stock: {{ product.stock }}</p>
        <q-card-section  v-show="isHide" class="row items-center">
          <q-btn icon="remove" @click="onAdd"/>
          <q-input type="number" v-model="quantity" filled outlined dense min="1" :max="product.stock" 
          :rules="[val => val>0 || 'Not matched',val=>val<=product.stock||'Not enough']"
          style="width: 100px;height: 40px;margin: 0 10px;"/>
          <q-btn icon="add" @click="onSub"/>
        </q-card-section>
      </q-card-section>
    </q-card-section>
    <q-separator/>

    <q-card-actions align="right" v-show="isHide">
      <q-btn unelevated icon="add_shopping_cart" :disable="product.stock<=0" flat color="teal" @click="store.addToCart(product.id,quantity)">
        Add to cart
      </q-btn>
    </q-card-actions>
  </q-card>
  <q-dialog :value="alert" @change="overStock">
    <q-card >
      <q-card-section class="q-pt-none dialog-content text-h6" align="center" style="margin-top:20px;">
        Dat den so luong toi da trong gio hang
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="red" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from 'vue'
import { useProductsStore } from 'src/stores/products_store'

export default {
  props:{
    product: {
      type: Object,
      required: true,
    },
    isHide: {
      type: Boolean
    }
  },
  setup () {
    const quantity = ref(1)
    const store = useProductsStore()
    return {
      slide: ref(1),
      quantity,
      store,
      alert:ref(false)
    }
  },
  methods:{
    onAdd(){
      this.quantity<=1?1:this.quantity--
    },
    onSub(){
      this.quantity>=this.product.stock?this.product.stock:this.quantity++
    },
    overStock(){
      this.alert = product.stock === store.cart.find(item=>item.id===product.id).quantity?true:false
    }
  }

}
</script>
<style scoped>
  .carousel{
    width: 500px;
  }
@media only screen and (max-width: 400px) {
  .carousel{
    display: block;
    max-width: 350px;
  }
}
</style>