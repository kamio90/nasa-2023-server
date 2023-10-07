import { type ProjectPlace } from '@domain/interfaces/project-place.interface';
import { type ProjectStatus } from '@domain/interfaces/project-status.interface';
import { ProjectService } from '@domain/services/project.service';
import express, { type Request, type Response } from 'express';
import { Types } from 'mongoose';

const router = express.Router();

router.get('/config/status', async (req: Request, res: Response) => {
  try {
    const userService = new ProjectService();

    const result = await userService.getProjectStatus();

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/config/place', async (req: Request, res: Response) => {
  try {
    const userService = new ProjectService();

    const result = await userService.getProjectPlace();

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post('/create', async (req: Request, res: Response) => {
  try {
    const {
      title,
      authorId,
      status,
      placeWhereProjectTakePlace,
      placeWhereUserCanParticipateInProject,
      projectStartingDate,
      projectEndingDate,
      projectDescription,
      personalDescription,
    } = req.body;

    const projectService = new ProjectService();

    const createdProject = await projectService.createProject(
      title,
      new Types.ObjectId(authorId),
      status as ProjectStatus,
      placeWhereProjectTakePlace as ProjectPlace,
      placeWhereUserCanParticipateInProject as ProjectPlace,
      new Date(projectStartingDate),
      new Date(projectEndingDate),
      projectDescription,
      personalDescription
    );

    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
