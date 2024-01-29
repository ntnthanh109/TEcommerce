<template>
    <div class="q-md">
      <q-layout view="lHh Lpr lff" container style="height: 100vh;border-radius: 0px" class="shadow-2 rounded-borders">
        <q-header elevated class="bg-cyan-8" >
          <q-toolbar>
            <q-toolbar-title>2NTShop</q-toolbar-title>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" align="left"/>
            <q-btn flat icon="logout" label="Logout" @click="handleLogout"/>
          </q-toolbar>
        </q-header>
  
        <q-drawer 
          v-model="drawer"
          show-if-above
          :width="200"
          :breakpoint="400"
        >
          <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
            <q-list padding>
              
              <q-item clickable v-ripple :to="`/products`">
                <q-item-section avatar>
                  <q-icon name="inventory"/>
                </q-item-section>
                
                <q-item-section>
                  Products
                </q-item-section>
              </q-item>
            </q-list>
            <q-separator />
          </q-scroll-area>
  
          <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
            <div class="absolute-bottom bg-transparent">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </div>
          </q-img>
        </q-drawer>
  
        <q-page-container>
          <q-page>
            <router-view />
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { authStore } from 'src/stores/auth_store'

  export default {
    name:"AdminLayout",
    setup () {
      const drawer=ref(false)
      const store = authStore()
      return {
        drawer,
        store
      }
    },
    methods:{
      handleLogout(){
        this.store.logout()
        this.$router.push('/signin')
      }
    }
  }
</script>

  