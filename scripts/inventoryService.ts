import { User } from "./models/user";
import { Item } from "./models/item";
import Axios from "axios";

export class InventoryService {
  static users: User[] = [];
  static items: Item[] = [];

  static async GetUsers(
    company: string,
    inventory: string,
    key: string
  ): Promise<boolean> {
    try {
      const result = await Axios.get(
        `/inventories/${company}/${inventory}/usernames`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": key,
          },
        }
      );
      if (result.status === 200) {
        InventoryService.users = result.data;
        return true;
      }
      console.error(result.statusText);
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  static async AddUser(
    company: string,
    inventory: string,
    key: string,
    username: string
  ): Promise<boolean> {
    try {
      const result = await Axios.post(
        `/inventories/${company}/${inventory}/usernames`,
        {
          name: username,
        },
        {
          headers: {
            "Ocp-Apim-Subscription-Key": key,
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        return true;
      }
      console.error(result.statusText);
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  static async GetItems(
    company: string,
    inventory: string,
    username: string,
    key: string
  ): Promise<boolean> {
    try {
      const result = await Axios.get(
        `/inventories/${company}/${inventory}/items`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": key,
          },
          params: {
            username: username,
          },
        }
      );
      if (result.status === 200) {
        InventoryService.items = result.data;
        return true;
      }
      console.error(result.statusText);
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  static async AddItem(
    company: string,
    inventory: string,
    key: string,
    item: Item
  ): Promise<boolean> {
    try {
      const result = await Axios.post(
        `/inventories/${company}/${inventory}/items`,
        item,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": key,
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        return true;
      }
      console.error(result.statusText);
    } catch (error) {
      console.error(error);
    }
    return false;
  }
}
