import { type User } from '@domain/entity/user.entity';
import { UserService } from '@domain/services/user.service';
import express, { type Request, type Response } from 'express';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userService = new UserService();

    const loginResult = await userService.loginUser(email, password);

    if (loginResult.success) {
      res
        .status(200)
        .json({ message: 'Login successful', token: loginResult.token });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const userService = new UserService();
    const newUserInput: User = req.body;
    const createdUser = await userService.createUser(newUserInput);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/config/academic-title', async (req: Request, res: Response) => {
  try {
    const userService = new UserService();

    const result = await userService.getUserAcademicTitle();

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/config/city', async (req: Request, res: Response) => {
  try {
    const userService = new UserService();

    const result = await userService.getUserCity();

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/config/country', async (req: Request, res: Response) => {
  try {
    const userService = new UserService();

    const result = await userService.getUserCountry();

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/config/education', async (req: Request, res: Response) => {
  try {
    const userService = new UserService();

    const result = await userService.getUserEducation();

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/config/languages', async (req: Request, res: Response) => {
  try {
    const userService = new UserService();

    const result = await userService.getUserLanguages();

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/test', async (req: Request, res: Response) => {
  try {
    const userService = new UserService();

    const result = await userService.test();

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
