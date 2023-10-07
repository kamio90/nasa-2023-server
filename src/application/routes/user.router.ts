import { type User } from '@domain/entity/user.entity';
import { verifyToken } from '@domain/middlewares/jwt-authentication.middleware';
import { UserService } from '@domain/services/user.service';
import express, { type Request, type Response } from 'express';

const router = express.Router();
const userService = new UserService();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const newUserInput: User = req.body;
    const createdUser = await userService.createUser(newUserInput);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(400).json({ message: 'Registration failed: Invalid data' });
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

router.get(
  '/config/academic-title/usa',
  async (req: Request, res: Response) => {
    try {
      const userService = new UserService();

      const result = await userService.getUserAcademicTitleUSA();

      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

router.get(
  '/config/academic-title/other',
  async (req: Request, res: Response) => {
    try {
      const userService = new UserService();

      const result = await userService.getUserAcademicTitleOther();

      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

router.get(
  '/config/academic-title/europe',
  async (req: Request, res: Response) => {
    try {
      const userService = new UserService();

      const result = await userService.getUserAcademicTitleEurope();

      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

router.get(
  '/config/academic-title/canada',
  async (req: Request, res: Response) => {
    try {
      const userService = new UserService();

      const result = await userService.getUserAcademicTitleCanada();

      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

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

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const loginResult = await userService.loginUser(email, password);

    if (loginResult.success) {
      res
        .status(200)
        .json({ message: 'Login successful', token: loginResult.token });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Login failed: Invalid email or password' });
  }
});

router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get(
  '/users/:userId',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      if (userId !== req.params.userId) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const user = await userService.getUserById(userId);

      if (user == null) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

export default router;
