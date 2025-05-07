import { NextFunction, Request, Response } from 'express';
import { createUser, getAllUsers } from '../services/userService';

export const createUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Your logic here
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Your logic here
  res.status(200).json({ users: [] });
};