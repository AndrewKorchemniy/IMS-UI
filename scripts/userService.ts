import { CompanyService } from "./companyService";

export class UserService {
  static company = "";
  static inventory = "";
  static key = "";
  static username = "";
  static isLoggedIn = false;

  static async login(company: string, key: string): Promise<boolean> {
    if (await CompanyService.GetInventories(company, key)) {
      UserService.company = company;
      UserService.key = key;
      UserService.isLoggedIn = true;
      return true;
    }
    return false;
  }

  // static async login(company: string, key: string): Promise<boolean> {
  //   UserService.company = company;
  //   try {
  //     const result = await Axios.get(`/inventories/${company}`, {
  //       headers: {
  //         "Ocp-Apim-Subscription-Key": key,
  //       },
  //     });
  //     if (result.status === 200) {
  //       UserService.company = company;
  //       UserService.key = key;
  //       UserService.isLoggedIn = true;
  //       CompanyService.inventories = result.data;
  //       return true;
  //     }
  //     console.error(result.statusText);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   return false;
  // }
}
