const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addUser = async (req, res) => {
  const { name, email, password, role, isAdmin, image } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,

        role,
        isAdmin,
        image,
      },
    });

    res.status(201).json({ newUser, message: "user created succesfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding user", error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      return res.status(400).send({ message: "User doesn't exist" });
    }

    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatched) {
      return res.status(400).send({ message: "Incorrect old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { name: username },
      data: { password: hashedPassword },
    });

    return res.status(200).send({ message: "Password successfully changed" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error changing password", error: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await prisma.user.findMany({});
    return res.status(200).send({ user, message: "users fetched succesfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "failed to fetch all users", error });
  }
};

exports.getSingleUserData = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return res
      .status(200)
      .send({ user, message: "user details fetched successfully" });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(400)
      .send({ message: "Failed to fetch user", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { image, name, email, password, Role, isAdmin, contact } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        password: password,
        role: Role,
        image: image,
        isAdmin: isAdmin,
        contact: parseInt(contact, 10),
      },
    });
    return res
      .status(200)
      .send({ updatedUser, message: "user details updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Failed to update user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    prisma.user.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).send({ message: "user deleted succesfully" });
  } catch (err) {
    return res.status(200).send({ message: "failed to delete user " }, err);
  }
};
exports.addPermissions = async (req, res) => {
  const { role, permissions } = req.body;

  if (!role || !permissions || !Array.isArray(permissions)) {
    return res
      .status(400)
      .json({ error: "Invalid input: role and permissions are required" });
  }

  try {
    const existingPermission = await prisma.permission.findFirst({
      where: { role },
    });

    let result;
    if (existingPermission) {
      result = await prisma.permission.update({
        where: { id: existingPermission.id },
        data: { permissions },
      });
    } else {
      result = await prisma.permission.create({
        data: { role, permissions },
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllPermissions = async (req, res) => {
  try {
    const permission = await prisma.permission.findMany({});
    return res
      .status(200)
      .send({ permission, message: "permission fetched succesfully" });
  } catch (error) {
    return res.status(400).send({ message: "cant fetch permsiions", error });
  }
};
