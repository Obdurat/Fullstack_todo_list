const Models = require("../../Database/models/");
const { CustomError } = require("../../errors/customError");

const getUser = async (credentials) => {
  const user = await Models.User.findOne({
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
