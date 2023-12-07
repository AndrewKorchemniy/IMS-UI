<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col>
        <v-sheet
          border="md"
          class="pa-6 pt-5 mx-auto rounded-lg shadow"
          max-width="400"
        >
          <p class="text-h5 font-weight-bold mb-4">Sign In</p>
          <v-text-field
            autofocus
            label="Company"
            v-model="company"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            label="Key"
            v-model="key"
            variant="outlined"
          ></v-text-field>
          <v-btn
            block
            class="text-none text-black"
            :color="loginButtonColor"
            size="x-large"
            variant="flat"
            @click="loginAsync"
          >
            <v-icon
              v-if="state === LoginState.None"
              left
              size="x-large"
              class="glow-dark"
              >mdi-login</v-icon
            >
            <v-progress-circular
              v-else-if="state === LoginState.Waiting"
              indeterminate
            ></v-progress-circular>
            <v-icon
              v-else-if="state === LoginState.Success"
              left
              size="x-large"
              class="glow-dark"
              >mdi-check</v-icon
            >
            <v-icon
              v-else-if="state === LoginState.Failure"
              left
              size="x-large"
              class="glow-dark"
              >mdi-close</v-icon
            >
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { StorageService } from "../scripts/storageService";
import { UserService } from "../scripts/userService";

const company = ref("");
const key = ref("");

onMounted(() => {
  company.value = StorageService.getId();
});

watch(company, (newId) => {
  StorageService.setId(newId);
});

enum LoginState {
  None,
  Waiting,
  Success,
  Failure,
}

const state = ref(LoginState.None);

const loginButtonColor = computed(() => {
  switch (state.value) {
    case LoginState.None:
      return "primary";
    case LoginState.Waiting:
      return "amber";
    case LoginState.Success:
      return "success";
    case LoginState.Failure:
      return "red";
  }
});

async function loginAsync() {
  if (state.value !== LoginState.None) {
    return;
  }
  state.value = LoginState.Waiting;
  if (await UserService.login(company.value, key.value)) {
    setTimeout(() => {
      state.value = LoginState.Success;
      setTimeout(() => {
        navigateTo("/company");
      }, 250);
    }, 250);
  } else {
    setTimeout(() => {
      state.value = LoginState.Failure;
      setTimeout(() => {
        state.value = LoginState.None;
      }, 2000);
    }, 250);
  }
}
</script>

<style scoped lang="css">
@import "../assets/styles/main.css";
</style>
