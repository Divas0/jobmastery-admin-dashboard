const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addCategory = async (req, res) => {
  const { name, subcategory } = req.body;

  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        subcategories: subcategory,
      },
    });

    return res
      .status(200)
      .json({ category: newCategory, message: "Category added successfully" });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Error adding category", error: error.message });
  }
};
exports.addSubCategory = async (req, res) => {
  const { subcategoryName, category } = req.body;
  try {
    const isExists = await prisma.subcategory.findUnique({
      name: subcategoryName,
    });
    if (!isExists) {
      return res.status(400).send({ message: "category dosent exists" });
    }
    const addedcategory = await prisma.user.create({
      where: {
        category: category,
      },
    });

    return res
      .status(200)
      .send({ addedcategory, message: "subcategory added succesfully" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error adding  category", error: error.message });
  }
};

exports.allCategory = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    return res
      .status(200)
      .send({ categories, message: "Categories fetched successfully" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Failed to fetch categories", error });
  }
};
