import { HttpClient } from "../utils";
import { Profile, ChangePassword } from "types/profile";

const userAPIInstance = new HttpClient("https://ya-praktikum.tech/api/v2/user");

class UserAPI {
  public changeUserProfile(userData: Profile) {
    const headers = { "Content-Type": "application/json" };
    const response = userAPIInstance.put("/profile", userData, headers);
    return response;
  }

  public changeAvatar(avatarData: FormData) {
    const response = userAPIInstance.put("/profile/avatar", avatarData);
    return response;
  }

  public changePassword(passwordData: ChangePassword) {
    const headers = { "Content-Type": "application/json" };
    const response = userAPIInstance.put("/password", passwordData, headers);
    return response;
  }

  public searchUser = (data: { [key: string]: string }) => {
    const headers = { "Content-Type": "application/json" };
    const response = userAPIInstance.post("/search", data, headers);
    return response;
  };
}

export default new UserAPI();
