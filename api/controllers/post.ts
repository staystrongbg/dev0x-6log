import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  const posts = await prisma.posts.findMany();
  return res.status(200).json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await prisma.posts.findUnique({
    where: {
      id: +id,
    },
    include: {
      users: {
        select: {
          username: true,
          id: true,
          img: true,
        },
      },
    },
  });
  return res.status(200).json(post);
};

export const createPost = async (req: Request, res: Response) => {};

export const deletePost = async (req: Request, res: Response) => {};

export const editPost = async (req: Request, res: Response) => {};
