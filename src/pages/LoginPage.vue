<template>
    <q-page class="row items-center justify-center no-wrap">
      <ModalLogin/>
    </q-page>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import ModalLogin from 'components/ModalLogin.vue';
  
  
  export default defineComponent({
    name: "LoginPage",
    components: {
      ModalLogin
  },
  })
  </script>
  