import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

//TODO register functionality
export const register = async (req: Request, res: Response) => {};

export const login = async (req: Request, res: Response) => {
  console.log(req.body);
  const { username } = req.body;

  const user = await prisma.users.findMany({
    where: {
      username: username,
    },
  });

  if (user.length === 0) return res.status(404).json('User not found');
  console.log(user);
  //* check password
  const isPassCorrect = bcrypt.compareSync(req.body.password, user[0].password);

  if (!isPassCorrect)
    return res.status(400).json('Wrong username or password!');

  const token = jwt.sign({ id: user[0].id }, 'jwttoken');

  const { password, ...rest } = user[0];
  res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
};

export const logout = async (req: Request, res: Response) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.');
};
