import { CompanyService } from "./companyService";

export class UserService {
  static company = "";
  static inventory = "";
  static username = "";
  static key = "";
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
}
