<template>
    <div class="q-pa-md q-gutter-sm column">
        <OrderCard v-for="item in store.order" :order="item"/>
    </div>
</template>
<script>
import { onMounted } from 'vue';
import OrderCard from 'src/components/OrderCard.vue';
import { useProductsStore } from 'src/stores/products_store';

export default{
    components:{
        OrderCard
    },
    setup(){
        const store= useProductsStore()
        onMounted(()=>{
            store.getOrder()
        })
        return{
            store
        }
    }
}
</script>