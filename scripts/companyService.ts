import { Inventory } from "./models/inventory";
import Axios from "axios";

export class CompanyService {
  static inventories: Inventory[] = [];

  static async GetInventories(company: string, key: string): Promise<boolean> {
    try {
      const result = await Axios.get(`/inventories/${company}`, {
        headers: {
          "Ocp-Apim-Subscription-Key": key,
        },
      });
      if (result.status === 200) {
        CompanyService.inventories = result.data;
        return true;
      }
      console.error(result.statusText);
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  static async AddInventory(
    company: string,
    key: string,
    inventoryName: string
  ): Promise<boolean> {
    try {
      const result = await Axios.post(
        `/inventories/${company}`,
        {
          inventoryName: inventoryName,
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
