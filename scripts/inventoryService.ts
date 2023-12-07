import { User } from "./models/user";
import Axios from "axios";

export class InventoryService {
  static users: User[] = [];

  static async GetUsers(
    company: string,
    inventory: string,
    key: string
  ): Promise<boolean> {
    try {
      const result = await Axios.get(`/inventories/${company}/${inventory}`, {
        headers: {
          "Ocp-Apim-Subscription-Key": key,
        },
      });
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
        `/inventories/${company}/${inventory}`,
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
}
