<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <navbar></navbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { UserService } from "~/scripts/userService";
import navbar from "~/components/navbar.vue";

if (!UserService.isLoggedIn) {
  navigateTo("/");
}
</script>
