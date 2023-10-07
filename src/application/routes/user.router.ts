import { UserService } from '@domain/services/user.service';
import express, { type Request, type Response } from 'express';

const router = express.Router();

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
    res.status(500).json({ message: 'Server error' });
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
    res.status(500).json({ message: 'Server error' });
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
    res.status(500).json({ message: 'Server error' });
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
    res.status(500).json({ message: 'Server error' });
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
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
