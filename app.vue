<template>
  <v-app>
    <router-view v-slot="{ Component, route }">
      <transition name="router-transition" mode="out-in" appear>
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </v-app>
</template>

<script setup lang="ts">
import Axios from "axios";
Axios.defaults.baseURL = "https://ims-apim-apk.azure-api.net/api";

useHead({
  title: "IMS",
  meta: [{ name: "description", content: "Inventory Management System." }],
});
</script>
