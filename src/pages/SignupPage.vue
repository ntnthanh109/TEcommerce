<template>
    <q-page class="row items-center justify-center no-wrap">
        <ModalSignup/>
    </q-page>
</template>
  
<script>
    import { defineComponent } from 'vue'
    import ModalSignup from 'components/ModalSignup.vue';


    export default defineComponent({
        name: "SignupPage",
        components: {
            ModalSignup
        }
    })
</script>
  