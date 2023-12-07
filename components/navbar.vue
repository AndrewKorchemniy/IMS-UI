<template>
  <v-sheet
    border="md"
    class="pa-4 pl-6 mx-auto rounded-lg w-100 d-flex aligned-items-center shadow"
  >
    <h1 v-if="route.path === '/company'">/{{ UserService.company }}</h1>
    <h1 v-else>/{{ UserService.company }}/{{ UserService.inventory }}</h1>
    <v-spacer />
    <v-btn
      class="text-black shadow-xsm"
      color="warning"
      size="x-large"
      variant="flat"
      @click="logout()"
      ><v-icon size="x-large" class="glow-dark">mdi-logout</v-icon></v-btn
    >
  </v-sheet>
</template>

<script setup lang="ts">
import { UserService } from "~/scripts/userService";
import { useRoute } from "vue-router";

const route = useRoute();

function logout() {
  UserService.isLoggedIn = false;
  navigateTo("/");
}
</script>

<style scoped lang="css">
@import "../assets/styles/main.css";
</style>
