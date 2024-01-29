<template>
    <div class="q-pa-md modal">
      <h2 class="modal-title">Sign Up</h2>
      <q-form
        @submit="handleSignup"
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
  
        <q-input label="Your password"
        color="teal" v-model="password" filled :type="isPwd ? 'password' : 'text'"
        lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type your password',
            isStrongPassword
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
        <q-input label="Confirm your password"
        color="teal" v-model="confirmPassword" filled :type="isConfirmPwd ? 'password' : 'text'"
        lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type your password',
            val => val === password || 'Password not match'
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isConfirmPwd = !isConfirmPwd"
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
        You had an account?
        <router-link :to="`/signin`">Sign In</router-link>
      </div>
    </div>
    <q-dialog v-model="alert">
      <q-card style="width: 300px;" >
        <q-icon align="center" name="task_alt" class="dialog-icon" color="teal"/>
        <q-card-section class="q-pt-none dialog-content">
          Successfull
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="teal" v-close-popup @click="$router.push('/signin')"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { authStore } from 'src/stores/auth_store'

  export default {
    name: 'ModalSignup',
    components: {},
    setup() {
      const store = authStore()
      const errorShow = ref(false)
      const errorContent = ref('')
      const name = ref('th')
      const password = ref('')
      const isPwd = ref(true)
      const isConfirmPwd = ref(true)
      const confirmPassword = ref('')
      const loading = ref(false)
      const alert = ref(false)
      return {password, name,errorShow,isPwd,errorContent,isConfirmPwd,confirmPassword,store,loading,alert};
    },
    methods: {
      onReset () {
        this.name = ""
        this.password = ""
      },
      isValidEmail(val) {
        const emailPattern =
            /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid email';
      },
      isStrongPassword(val) {
        const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return password.test(val) || 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      },
      async handleSignup(){
        this.errorShow = false
        this.loading = true
        try{
          await this.store.signup(this.name,this.password)
          this.loading = false
          this.alert = true
          // this.$router.push('/signin')
        }catch(err){
          this.errorContent = err.error;
          this.loading = false
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
    .dialog-icon{
      display: flex;
      margin: 10px auto;
      font-size: 50px;
    }
    .dialog-content{
      text-align: center;
      color: #289482;
      font-size: 20px;
    }
  </style>