<template>
    <div class="q-pa-md q-gutter-sm">
        <!-- <q-img src="https://cf.shopee.vn/file/vn-50009109-19f60102ae137fb1cbcab33f3b769a76_xxhdpi"/> -->
        <div class="list-categories">
            <q-btn push color="teal" class="arrow-icon" round icon="arrow_forward" @click="document.querySelector('.list-categories').scrollX(+300);"/>  
            <q-card v-for="cate in store.categories" class="category" :class="{active: activeIndex === cate.id && store.isCategory}" flat bordered @click="onCategory(cate.id)">
                <q-img :src="cate.thumbnail" style="width: 200px;height: 100px;"/>
                <q-separator />
                <q-card-section>
                    {{ cate.title }}
                </q-card-section>
            </q-card>   
        </div>
        <q-img v-if="store.currentProducts.length === 0" src="https://dentclues.com/img/no_product_found.jpg"/>
        <div v-else class="products-content">
            <div class="row justify-between items-center">
                <h1 class="title">Products</h1>
                <div class="products-tool">
                    <q-btn v-if="upPrice" color="teal" icon="arrow_upward" stack size="sm" label="Price" @click="upPrice=!upPrice"/>
                    <q-btn v-else color="teal" icon="arrow_downward" stack size="sm" label="Price"  @click="upPrice=!upPrice"/>
                    <q-btn v-if="!store.isCategory" color="teal" icon="filter_alt" size="sm" style="margin-left: 10px;" stack label="Filter" @click="dialog=true">
                        <q-badge floating color="red" rounded v-if="store.isFilter" />
                    </q-btn>
                </div>
            </div>
            <div class="list-product row justify-center">
                <CardProduct v-for="pro in store.currentProducts" 
                :product ="pro"
                @click="onClickProduct(pro.id)">
                </CardProduct>
            </div>
            <div class="q-pa-lg flex flex-center">
                <q-pagination color="teal"
                v-model="current"
                :max="store.totalPage"
                direction-links
            />
        </div>
        <q-dialog class="filter-modal" v-model="dialog" position="right" v-close-up>
            <q-card style="width: 350px;height: 100%;">
                <q-linear-progress :value="0.6" color="teal" />
                <q-card-section class="row items-center no-wrap" style="display: block;">
                <div class="text-weight-bold">Filters</div>
                <q-separator />
                <q-card-section>
                    <h5 style="margin: 0;">Category</h5>
                    <q-option-group
                    :options="store.listFilter"
                    type="checkbox"
                    v-model="filter"
                    />
                </q-card-section>
                <q-separator />
                <q-btn flat label="Reset" @click="onResetFilter"/>
                <q-btn flat label="Apply" color="teal" @click="onApplyFilter"/>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="showDetail">
            <CardDetailProduct :product="detailProduct" :isHide="true"/>
        </q-dialog>
    </div>
    </div>
</template>
<script>
import {ref,onMounted,watch} from 'vue'
import CardProduct from "components/CardProduct.vue"
import CardDetailProduct from "components/CardDetailProduct.vue"
import { useProductsStore } from 'src/stores/products_store'
export default {
  name: "ProductsPage",
  components: {
    CardProduct,
    CardDetailProduct
  },
  setup() {
    const store = useProductsStore()
    const current = ref(1) 
    const showDetail = ref(false)
    const upPrice = ref(false)
    const dialog = ref(false)
    const activeIndex = ref(0)
    const isFilter = ref(false)
    const filter = ref([])
    const detailProduct = ref({})
    onMounted(()=>{
        store.getAllProducts(current.value)
        store.getAllCategories()
    })
    watch(current,()=>{
        store.getAllProducts(current.value)
    })
    watch(upPrice,()=>{
        current.value = 1
        store.SortByPrice(upPrice.value)
    })
    watch(
      () => store.$state.isFilter,
      (newVal, oldVal) => {
        if(!store.isFilter) filter.value = []
      }
    );
    return {
      showDetail,
      detailProduct,
      upPrice,
      dialog,
      filter,
      current,
      store,
      activeIndex,
      isFilter
    };
  },
  methods:{
    onCategory(id){
        this.store.getProductsBtCategory(id)
        this.activeIndex = id
        this.store.isFilter = false
        this.store.isCategory = id==0?false: true
    },
    onApplyFilter(){
        this.isFilter = true
        this.current = 1
        this.dialog = false
        this.store.getProductsByFilter(this.filter)
    },
    onResetFilter(){
        this.filter = []
    },
    onClickProduct(id){
        this.detailProduct = this.store.getProductById(id)
        this.showDetail = true
    }
  }
}
</script>
<style scoped>
.list-categories{
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    overflow: auto;
    column-gap: 15px;
}
.list-categories::-webkit-scrollbar {
  display: none;
}
.active{
    background-color: teal;
    border: none;
    color: white;
}
.title{
    line-height: 2rem;
    font-size: 20px;
    color: #231f1e;
    font-weight: 700;
    text-transform: capitalize;
}
.products-content{
    background-color: white;
    border-radius: 10px;
    padding: 10px;

}
.list-product{
    column-gap: 29px;
    row-gap: 20px;
}
.arrow-icon{
    position: absolute;
    right: 0;
    z-index: 1;
    transform: translateY(100%);
}

</style>