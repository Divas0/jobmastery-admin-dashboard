const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client"); 
const prisma = new PrismaClient();
const saltRounds = 10;


exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    
    const userExists = await prisma.user.findUnique({
      where: { name:username, email:email },
    });

    if (userExists) {
      return res.status(400).send({ message: "User already registered" });
    }

    
    const hashedPassword = await bcrypt.hash(password, saltRounds);

  
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).send({ user: { id: user.id, username: user.username, email: user.email }, message: "User registered successfully" });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(400).send({ message: "User registration failed", error });
  } finally {
    await prisma.$disconnect();
  }
};
exports.login = async (req, res) => {
  const{email, password } = req.body;
  try {
    
    const user = await prisma.user.findUnique({
      where: { 
        email
      },
    });

    if (!user) {
      return res.status(400).send({ message: "User not registered" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(400).send({ message: "Wrong password" });
    }

    
    const jwtToken = jwt.sign(
      {
        _id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRETKEY,
      { expiresIn: '24h' } 
    );

    
    res.cookie("token", jwtToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).send({ user: { id: user.id, username: user.username, email: user.email }, jwtToken });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(400).send({ message: "User login failed", error });
  } finally {
    await prisma.$disconnect();
  }
};
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      path: "/",
      sameSite: "lax",
    });
    return res.status(200).send({ message: "Logged out successfully!" });
  } catch (error) {
    console.error('Logout Error:', error);
    return res.status(500).send({ message: "Error logging out!", error });
  }
};
