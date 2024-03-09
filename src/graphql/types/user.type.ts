import { userRolesEnum } from "../../interfaces/user";

export const userType = `

enum UserRole {
  ${userRolesEnum.USER}
  ${userRolesEnum.ADMIN}
}

type User {
     _id : ID
    email : String 
    role :UserRole
  }
  type loginResponse {
    token : String
    user : User
  }
  type signupResponse {
    token : String
    user : User
  }



`;
