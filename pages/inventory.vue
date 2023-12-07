<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <navbar></navbar>
      </v-col>
    </v-row>
    <v-row class="px-3">
      <v-sheet border="md" class="pa-4 mt-1 mx-auto rounded-lg w-100 shadow">
        <v-table class="w-100" hover striped>
          <thead>
            <tr>
              <th class="text-left" style="width: 0">
                <p
                  class="text-h5 text-decoration-underline font-weight-bold mb-4"
                >
                  Usernames
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in InventoryService.users" :key="user.id">
              <td>{{ user.name }}</td>
            </tr>
          </tbody>
        </v-table>

        <v-dialog v-model="dialog" max-width="400">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="text-h6 mt-6 mb-2 ml-2"
              variant="flat"
              color="blue-grey-darken-1"
            >
              <v-icon size="x-large" class="glow">mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-sheet
            border="md"
            class="pa-6 pt-5 mx-auto rounded-lg shadow"
            width="400"
          >
            <p class="text-h5 font-weight-bold mb-4">Create User</p>
            <v-text-field
              label="User Name"
              v-model="newUserName"
              variant="outlined"
              width="400px"
            ></v-text-field>
            <v-btn
              color="blue-grey-darken-1"
              class="mr-4 glow"
              variant="flat"
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn color="red" class="glow" variant="flat" @click="AddUser()">
              Create
            </v-btn>
          </v-sheet>
        </v-dialog>
        <v-overlay :model-value="overlay" class="align-center justify-center">
          <v-progress-circular
            color="primary"
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { UserService } from "~/scripts/userService";
import navbar from "~/components/navbar.vue";
import { InventoryService } from "~/scripts/inventoryService";

const dialog = ref(false);
const overlay = ref(false);
const newUserName = ref("");

if (!UserService.isLoggedIn) {
  navigateTo("/");
}

async function AddUser() {
  overlay.value = true;
  const result = await InventoryService.AddUser(
    UserService.company,
    UserService.inventory,
    UserService.key,
    newUserName.value
  );
  if (!result) {
    alert("Failed to add user.");
  } else {
    await GetUsers();
  }
  overlay.value = false;
  dialog.value = false;
}

async function GetUsers() {
  overlay.value = true;
  await InventoryService.GetUsers(
    UserService.company,
    UserService.inventory,
    UserService.key
  );
  overlay.value = false;
}
</script>

<style scoped lang="css">
@import "../assets/styles/main.css";
</style>
