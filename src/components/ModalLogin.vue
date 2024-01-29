<template>
    <div class="q-pa-md modal">
      <h2 class="modal-title">Login</h2>
      <q-form
        @submit="handleLogin"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input color="teal"
          filled
          v-model="name"
          label="Email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your email', isValidEmail]"
        />
  
        <q-input  label="Your password" color="teal" v-model="password" filled :type="isPwd ? 'password' : 'text'"
        lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type your password',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="row justify-center text-center">
          <div class="showError" v-if="errorShow">
            <q-icon name="report_problem"/>
            {{ errorContent }}
          </div>
          <q-spinner-pie color="teal" size="1em" v-if="loading"/>
        </div>
        <div align="right">
          <q-btn label="Submit" type="submit" color="teal"/>
          <q-btn label="Reset" type="reset" color="teal" flat class="q-ml-sm" />
        </div>
      </q-form>
      <div class="modal-link">
        You don't have an account?
        <router-link class="link-signup" :to="`/signup`">Sign Up</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import {authStore} from 'stores/auth_store'

  export default {
    name: 'ModalLogin',
    setup() {
      const store = authStore()
      const errorShow = ref(false)
      const errorContent = ref('')
      const name = ref('u1@gmail.com')
      const password = ref('Useruser@1')
      const isPwd = ref(true)
      const loading = ref(false)
      return { password, name,errorShow,isPwd,errorContent,store,loading};
    },
    methods: {
      onReset () {
        this.name = ""
        this.password = "" 
        this.errorShow = false
      },
      isValidEmail(val) {
        const emailPattern =
            /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid email';
      },
      async handleLogin(){
        this.errorShow = false
        this.loading = true
        try{
          await this.store.login(this.name,this.password)
          this.loading = false
          this.$router.push('/')
        }catch(err){
          console.log('error->', err.error )
          this.loading = false
          this.errorContent = err.error;
          this.errorShow = true
        }
      }
    }
  }
  </script>
  <style scoped>
    .modal{
      width: 400px;
      padding:20px;
      border-radius: 10px;
      background-color: rgb(243, 239, 239);
    }
    .modal-title{
      color: #289482;
      text-align: center;
    }
    .modal-link{
      text-align: center;
      margin-top: 20px;
      font-size: 16px;
      color: gray;
    }
    .modal-link a{
      color: #289482;
    }
    .showError{
      color: red;
    }
  </style>