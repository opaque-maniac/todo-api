import createJWT from "./utils/createToken";
import prisma from "./utils/db";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: await bcrypt.hash(password, 10),
      },
    });

    const token = createJWT(user);

    return res.status(201).json({
      success: true,
      token,
      message: "User registered successfully",
    });
  } catch (e) {
    return next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = createJWT(user);
    return res.status(201).json({
      success: true,
      token,
      message: "User logged in successfully",
    });
  } catch (e) {
    return next(e);
  }
};
