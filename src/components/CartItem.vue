<template>
    <div class="row no-wrap justify-between items-center" style="width: 300px;">
        <div class="row items-center">
            <q-img :src="cart.thumbnail" style="width: 80px;height: 50px;"/>
            <div style="text-align: left;margin-left: 5px;">{{ cart.title }}</div>
        </div>
        <div style="color: teal;">{{cart.price}}$</div>
    </div>
</template>
<script>
export default {
    name: "CartItem",
    props:{
        cart:{
            type: Object
        }
    },
    setup(){

    }
}
</script>