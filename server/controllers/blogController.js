const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");

exports.addBlogs = async (req, res) => {
  const url = req.file?.path;
  const file = req.file;
  console.log(file);

  const {
    title,
    tagline,
    secondHeading,
    reporterName,
    guestInfo,
    newsHashTag,
    content,
    scheduledPostTime,
    categories,

    imageCaption,
    publishStatus,
  } = req.body;

  const isoScheduledPublishTime = scheduledPostTime
    ? new Date(scheduledPostTime).toISOString()
    : null;

  try {
    if (!title || !content || !categories) {
      return res
        .status(400)
        .json({ message: "Title, content, and categories are required" });
    }
    if (!reporterName) {
      return res.status(400).json({ message: "Reporter name is required" });
    }

    if (!Array.isArray(categories)) {
      return res.status(400).json({ message: "Categories must be an array" });
    }

    const newsHashTagTexts = newsHashTag
      ? newsHashTag.map((tag) => tag.text)
      : [];
    let guestId = null;
    if (guestInfo && guestInfo.name && guestInfo.email) {
      const guest = await prisma.guest.upsert({
        where: { email: guestInfo.email },
        update: {
          name: guestInfo.name,
          contact: guestInfo.contact,
          address: guestInfo.address,
        },
        create: {
          name: guestInfo.name,
          email: guestInfo.email,
          contact: guestInfo.contact || 0,
          address: guestInfo.address || "",
        },
      });
      guestId = guest.id;
    }

    const author = await prisma.user.findFirst({
      where: { name: reporterName },
    });
    if (!author) {
      return res.status(400).json({ message: "Author not found" });
    }

    const categoryConnectOrCreate = categories.map((category) => ({
      where: { name: category.name },
      create: {
        name: category.name,
        subcategories: category.subcategories || [],
      },
    }));

    const blog = await prisma.post.create({
      data: {
        title,
        subtitle: secondHeading,
        tagline,
        content,
        scheduledPublishTime: isoScheduledPublishTime,
        newsHashTag: newsHashTagTexts,
        status: publishStatus ? "PUBLISH" : "DRAFT",
        image: url,
        caption: imageCaption,
        author: { connect: { id: author.id } },
        guestWriter: guestId ? { connect: { id: guestId } } : undefined,
        categories: {
          connectOrCreate: categoryConnectOrCreate,
        },
      },
      include: {
        categories: true,
      },
    });

    return res.status(200).json({ blog, message: "Blog added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to save blog", error: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.post.findMany({});
    return res
      .status(200)
      .send({ blogs, message: "all blogs fetched succesfully" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "all blogs fetched succesfully", error });
  }
};

exports.getBlogById = async (req, res) => {
  const id = req.params.id;

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    return res.status(200).send({ message: "Blog fetched successfully", blog });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ message: "Could not fetch blog", error: error.message });
  }
};
exports.updateBlog = async (req, res) => {
  const id = req.params.id;
  const {
    title,
    subtitle,
    tagline,
    content,
    publish,
    image,
    guest: guestData,
  } = req.body;

  try {
    const existingBlog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    const updatedBlog = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        subtitle,
        tagline,
        content,
        status: publish ? "PUBLISH" : "DRAFT",
        image,
        guestWriter: guestData
          ? {
              update: {
                name: guestData.name,
                email: guestData.email,
                address: guestData.address,
                contactno: guestData.contactno,
              },
            }
          : undefined,
      },
    });

    return res
      .status(200)
      .send({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Failed to update blog", error: error.message });
  }
};
exports.deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const existingBlog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ message: "Failed to delete blog", error: error.message });
  }
};
