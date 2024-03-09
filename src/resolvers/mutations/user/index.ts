import { creatUserDTO, updateUserDTO } from "../../../dto/user.dto";
import { validateJoiSchema } from "../../../middleware/validate";
import { LoginDTO } from "../../../dto/user.dto";
import { UserService } from "../../../services/user.service";
import {
  loginValidationSchema,
  signupValidationSchema,
  updateUserValidationSchema,
} from "../../../validetors/user.validator";

const userSerivice = new UserService();

const userMutationsResolvers = {
  async login(_: any, data: LoginDTO) {
    try {
      validateJoiSchema(data, loginValidationSchema);

      const responseData = await userSerivice.login(data.email, data.password);

      return responseData;
    } catch (error: any) {
      throw new error(error.message, error.status || 400);
    }
  },
  async signup(_: any, data: creatUserDTO) {
    try {
      console.log("is thereany problem ", data);

      validateJoiSchema(data, signupValidationSchema);

      const { password, role, email } = data;

      const responseData = await userSerivice.signup({
        email,
        password,
        role,
      });
      return responseData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async updateuser(_: any, data: updateUserDTO) {
    try {
      validateJoiSchema(data, updateUserValidationSchema);
      const { name, password, role, email, id } = data;
      const responseData = await userSerivice.UptateUser(
        id,
        name,
        email,
        password,
        role
      );
      return responseData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

export default userMutationsResolvers;
