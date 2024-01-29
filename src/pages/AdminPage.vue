<template>
    <div class="q-pa-md q-gutter-sm">
        <q-file color="teal" v-model="uploadFile" label="Upload file CSV">
            <template v-slot:prepend>
                <q-icon name="attach_file" />
            </template>
        </q-file>
        <q-table
          flat bordered
          title="Products"
          :rows="store.AllProducts"
          :columns="columns"
          row-key="name"
        >
        </q-table>
        <q-dialog v-model="alert">
            <q-card class="q-gutter-md">
                <q-card-section class="q-pt-none dialog-content text-h6" align="center" style="margin-top:20px;">
                Successfull Upload
                </q-card-section>
                <q-card-actions align="right">
                <q-btn flat label="OK" color="teal" v-close-popup @click="uploadFile=null"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
  
<script>
import { ref, onMounted} from 'vue';
import { useProductsStore } from 'src/stores/products_store';
import Papa from 'papaparse';

export default {
  name: "AdminPage",
  setup() {
    const store = useProductsStore();
    const uploadFile = ref(null)  
    onMounted(() => {
      store.getAllProducts()
    });
    return {
      store,
      uploadFile,
      alert:ref(false)
    };
  },
  watch:{
    uploadFile(newValue){
      Papa.parse(newValue,{
        header: true, 
        dynamicTyping: true,
        complete: (result) => {
          this.store.uploadCSV(result.data)
          this.alert = true
        },
      })
    }
  }
};
</script>

  