<template>
  <q-card class="my-card" bordered>
    <q-card-section>
      <div class="text-overline text-orange-9 row justify-between">
        {{ order.createdAt }}
        <span>{{ order.orders.length }} Products</span>
        </div>
      <div class="text-h5 q-mt-sm q-mb-xs row justify-between">
        Order #{{ order.id }}
        <span>Total: {{ order.price }}$</span>
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn
        label="See all products"
        color="grey"
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          <div v-for="item in order.orders">
            <div class="row no-wrap justify-between items-center" style="margin: 10px;">
              <q-img :src="store.getProductById(item.id).thumbnail" style="width: 80px;height: 50px;margin-right: 10px;"/>
              <div class="col-6">{{store.getProductById(item.id).title}}</div>
              <div class="col text-right">{{store.getProductById(item.id).price}}$</div>
              <div class="col text-right">Quantity: {{ item.quantity }}</div>
            </div>
          </div>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
  </template>
  <script>
  import { ref } from 'vue'
  import { useProductsStore } from 'src/stores/products_store';
  export default {
    props:{
      order:{
        type:Object
      },
    },
    setup () {
      const store = useProductsStore()
      return {
        expanded: ref(false),
        store
      }
    }
  }
  </script>