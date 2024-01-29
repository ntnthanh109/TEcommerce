<template>
    <q-layout view="lHh Lpr lff" container style="height: 100vh;background: linear-gradient(49deg, rgba(71,203,202,1), rgba(40,148,130,1));" class="shadow-2 rounded-borders">
      <q-page-container>
        <q-page>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
    
  <script>
    export default {
      name: "LoginLayout"
    }
  </script>
  
  