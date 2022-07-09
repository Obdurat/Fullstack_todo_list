const userModel = require("../../Database/models/user");
const { CustomError } = require("../../errors/customError");

const getUser = async (credentials) => {
  const user = await userModel.findOne({
    attributes: {
      exclude: ["id", "password", "createdAt", "updatedAt"],
    },
    where: {
      id: credentials.id,
    },
  });
  if (!user) throw new CustomError("User not found", 404);
  return user;
};

module.exports = getUser;
