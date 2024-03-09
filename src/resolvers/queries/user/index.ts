import { validateJoiSchema } from "../../../middleware/validate";
import { UserService } from "../../../services/user.service";

const userSerivice = new UserService();
const userQueriesResolver = {
  async userelist(_: any, data: any) {
    try {
      const { page, limit } = data;
      // await validateJoiSchema(data, PaginationValidtionSchema);
      const responseData = await userSerivice.userList(page, limit);
      return responseData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

export default userQueriesResolver;
