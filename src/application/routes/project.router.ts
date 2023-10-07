import { type ProjectPlace } from '@domain/interfaces/project-place.interface';
import { type ProjectStatus } from '@domain/interfaces/project-status.interface';
import { verifyToken } from '@domain/middlewares/jwt-authentication.middleware';
import { ProjectService } from '@domain/services/project.service';
import express, { type Request, type Response } from 'express';

const router = express.Router();

router.get('/projects', async (req: Request, res: Response) => {
  try {
    const projectService = new ProjectService();
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/projects/:projectId', async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const projectService = new ProjectService();
    const project = await projectService.getProjectById(projectId);

    if (project == null) {
      res.status(404).json({ message: 'Project not found' });
    } else {
      res.status(200).json(project);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post(
  '/:projectId/favorite',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const projectService = new ProjectService();
      const { projectId } = req.params;
      const userId = req.user.id;

      await projectService.addToFavorites(projectId, userId);

      res.status(200).json({ message: 'Project added to favorites' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

router.get('/config/status', async (req: Request, res: Response) => {
  try {
    const projectService = new ProjectService();

    const result = await projectService.getProjectStatus();

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
    const projectService = new ProjectService();

    const result = await projectService.getProjectPlace();

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
      status,
      placeWhereProjectTakePlace,
      placeWhereUserCanParticipateInProject,
      projectStartingDate,
      projectEndingDate,
      projectDescription,
      personalDescription,
    } = req.body;

    const projectService = new ProjectService();
    const userId = req.user.id;

    const createdProject = await projectService.createProject(
      title,
      userId,
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
