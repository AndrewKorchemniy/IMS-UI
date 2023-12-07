<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <navbar></navbar>
      </v-col>
    </v-row>
    <v-row class="px-3">
      <v-sheet border="md" class="pa-4 mt-1 mx-auto rounded-lg w-100 shadow">
        <v-table class="w-100 row-pointer" hover striped>
          <thead>
            <tr>
              <th class="text-left w-0">
                <p
                  class="text-h5 text-decoration-underline font-weight-bold mb-4"
                >
                  Items
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="w-0 text-h6 glow">Name</th>
              <th class="w-0 text-h6 glow">Lot</th>
              <th class="w-0 text-h6 glow">Location</th>
              <th class="w-0 text-h6 glow">Inspected</th>
              <th class="w-0 text-h6 glow">Quantity</th>
              <th class="w-0 text-h6 glow">Introduced</th>
              <th></th>
            </tr>
            <tr v-for="item in InventoryService.items" :key="item.id">
              <td class="w-0">{{ item.name }}</td>
              <td class="w-0">{{ item.lotNumber }}</td>
              <td class="w-0">{{ item.location }}</td>
              <td class="w-0">{{ item.isInspected }}</td>
              <td class="w-0">
                {{ item.quantityRemaining }}
                {{
                  item.quantityUnit.replace("Weight ", "").replace("Count", "")
                }}
              </td>
              <td class="w-0">{{ item.dateIntroduced }}</td>
              <td>
                <v-btn
                  color="red-darken-4"
                  class="mr-4 glow"
                  variant="tonal"
                  @click="DeleteItem(item.id)"
                >
                  <v-icon left size="x-large" class="glow-dark"
                    >mdi-close</v-icon
                  >
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>

        <v-dialog v-model="dialog" max-width="400">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="text-h6 mt-6 mb-2 ml-2"
              variant="flat"
              color="light-green-darken-2"
            >
              <v-icon size="x-large" class="glow">mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-sheet
            border="md"
            class="pa-6 pt-5 mx-auto rounded-lg shadow"
            width="400"
          >
            <p class="text-h5 font-weight-bold mb-4">Add Item</p>
            <v-text-field
              label="Item Name"
              v-model="newItem.name"
              variant="outlined"
              width="400px"
            ></v-text-field>
            <v-text-field
              label="Manufacturer"
              v-model="newItem.manufactureName"
              variant="outlined"
              width="400px"
            ></v-text-field>
            <v-text-field
              label="Location"
              v-model="newItem.location"
              variant="outlined"
              width="400px"
            ></v-text-field>
            <v-text-field
              label="Lot Number"
              v-model="newItem.lotNumber"
              variant="outlined"
              width="400px"
            ></v-text-field>
            <v-text-field
              type="number"
              :label="newItem.quantityUnit"
              v-model="newItem.quantity"
              variant="outlined"
              width="400px"
            ></v-text-field>

            <!-- TODO: Add date picker for expiration date -->
            <v-radio-group label="Type" inline v-model="newItem.quantityUnit">
              <v-radio label="Weight (kg)" value="Weight (kg)"></v-radio>
              <v-radio label="Count" value="Count"></v-radio>
            </v-radio-group>
            <v-checkbox
              label="Inspected"
              v-model="newItem.isInspected"
            ></v-checkbox>
            <v-btn
              color="blue-grey-darken-1"
              class="mr-4 glow"
              variant="flat"
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn color="red" class="glow" variant="flat" @click="AddItem()">
              Add
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

        <v-btn
          class="text-h6 mt-6 mb-2 ml-4"
          variant="flat"
          color="blue-grey-darken-1"
          @click="GetItems()"
        >
          <v-icon class="glow">mdi-refresh</v-icon>
        </v-btn>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { UserService } from "~/scripts/userService";
import navbar from "~/components/navbar.vue";
import { InventoryService } from "~/scripts/inventoryService";
import { Item } from "~/scripts/models/item";

if (!UserService.isLoggedIn) {
  navigateTo("/");
}

const dialog = ref(false);
const overlay = ref(false);
var newItem = reactive(new Item());

async function AddItem() {
  overlay.value = true;

  newItem.companyName = UserService.company;
  newItem.inventoryName = UserService.inventory;
  newItem.id = newItem.name;
  newItem.quantityRemaining = newItem.quantity;

  const result = await InventoryService.AddItem(
    UserService.company,
    UserService.inventory,
    UserService.key,
    newItem
  );
  if (!result) {
    alert("Failed to add item.");
  } else {
    newItem = reactive(new Item());
    await GetItems();
  }
  overlay.value = false;
  dialog.value = false;
}

async function GetItems() {
  overlay.value = true;
  await InventoryService.GetItems(
    UserService.company,
    UserService.inventory,
    UserService.username,
    UserService.key
  );
  overlay.value = false;
}

async function DeleteItem(itemId: string) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this item?"
  );

  if (confirmDelete) {
    overlay.value = true;
    const result = await InventoryService.DeleteItem(
      UserService.company,
      UserService.inventory,
      UserService.key,
      itemId
    );
    if (!result) {
      alert("Failed to delete item.");
    } else {
      await GetItems();
    }
    overlay.value = false;
  }
}
</script>

<style scoped lang="css">
@import "../assets/styles/main.css";
</style>
