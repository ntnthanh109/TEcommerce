<template>
  <div class=" row items-start">
      <q-card class="my-card" flat bordered>
        <q-img :src="product.thumbnail" style="width: 270px; height: 230px;"/>
        <q-card-section>
          <q-btn
            size="md"
            round
            color="teal"
            icon="add"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
            @click.stop="store.addToCart(product.id,1)"
          />
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ product.title }}
            </div>
          </div>
          <p style="color: orangered;">
            {{ product.price }}$
          </p>
        </q-card-section>
      </q-card>
  </div>
</template>
<script>
import { useProductsStore } from 'src/stores/products_store';

export default {
props: {
  product:{
    type: Object
  }
},
setup () {
  const store = useProductsStore()
  return {
    store
  }
},
methods:{
}
}
</script>
<style scoped>
.my-card{
  max-width: 270px;
}
</style>