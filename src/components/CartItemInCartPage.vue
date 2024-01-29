<template>
    <div class="row no-wrap justify-between items-center" @click="showDetail = true" style="width: 100%;background-color: white;padding: 10px 20px;border-radius: 5px;">
        <div class="row col-6 items-center">
            <q-checkbox v-model="cart.selected" />
            <q-img :src=product.thumbnail style="width: 100px;height: 100px;"/>
            <div style="text-align: left;margin-left: 10px;">{{product.title}}</div>
        </div>
        <div class="col" style="color: teal;">{{product.price}}$</div>
        <div class="row col items-center">
            <q-btn icon="remove" @click.stop="onAdd"/>
            <q-input type="number" v-model.stop="cart.quantity" filled outlined dense min="1" :max="product.stock"
            :rules="[val => val>0 || 'Not matched',val=>val<=product.stock||'Not enough']"
            style="width: 80px;height: 40px;margin: 0 10px;"/>
            <q-btn icon="add" @click.stop="onSub"/>
        </div>
        <q-btn class="col" icon="close" label="Remove" color="red" @click.stop="store.removeProductInCart(product.id)"/>
        <q-dialog v-model="showDetail">
            <CardDetailProduct :product="product" :isHide="false"/>
        </q-dialog>
    </div>
</template>
<script>
import {ref} from 'vue'
import CardDetailProduct from './CardDetailProduct.vue';
import { useProductsStore } from 'src/stores/products_store';
export default {
    name: "CartItemInCartPage",
    components:{
        CardDetailProduct
    },
    props:{
        product:{
            type: Object
        },
        cart:{
            type: Object
        }
    },
    setup(){
        const store = useProductsStore()
        return{
            store,
            showDetail: ref(false)
        }
    },
    methods:{
      onAdd(){
        this.cart.quantity<=1?1:this.cart.quantity--
      },
      onSub(){
        this.cart.quantity<this.product.stock?this.cart.quantity++:this.cart.quantity
      }
    }
}
</script>
<style scoped>
.q-field--error .q-icon {
  visibility: hidden;
}
</style>