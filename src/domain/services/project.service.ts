/* eslint-disable no-useless-catch */

import {
  ProjectModel,
  type ProjectDocument,
} from '@domain/entity/project.entity';
import { ProjectBenefit } from '@domain/interfaces/project/project-benefit.interface';
import { ProjectBudget } from '@domain/interfaces/project/project-budget.interface';
import { ProjectCategory } from '@domain/interfaces/project/project-category.interface';
import { ProjectPlace } from '@domain/interfaces/project/project-place.interface';
import { ProjectStatus } from '@domain/interfaces/project/project-status.interface';
import { Types } from 'mongoose';

interface ResponseType {
  success: boolean;
  message: string | any[];
  token?: string;
}

export class ProjectService {
  async getAllProjects(
    filters: Record<string, string>
  ): Promise<ProjectDocument[]> {
    try {
      const query: Record<string, any> = {};

      if (filters.title.length > 0) {
        query.title = { $regex: filters.title, $options: 'i' };
      }

      if (filters.status.length > 0) {
        query.status = filters.status;
      }

      const projects = await ProjectModel.find(query);
      return projects;
    } catch (error) {
      throw error;
    }
  }

  async getProjectById(projectId: string): Promise<ProjectDocument | null> {
    try {
      const project = await ProjectModel.findById(projectId);
      return project;
    } catch (error) {
      throw error;
    }
  }

  async addToFavorites(projectId: string, userId: string): Promise<void> {
    const project = await ProjectModel.findById(projectId);

    if (project == null) {
      throw new Error('Project not found');
    }

    const userIdAsObjectId = new Types.ObjectId(userId);

    if (!project.favoriteByUsers.includes(userIdAsObjectId)) {
      project.favoriteByUsers.push(userIdAsObjectId);
      await project.save();
    }
  }

  async createProject(
    title: string,
    authorId: Types.ObjectId,
    status: ProjectStatus,
    placeWhereProjectTakePlace: ProjectPlace,
    placeWhereUserCanParticipateInProject: ProjectPlace,
    projectStartingDate: Date,
    projectEndingDate: Date,
    projectDescription: string,
    personalDescription: string
  ): Promise<ProjectDocument> {
    try {
      const project = new ProjectModel({
        title,
        author: authorId,
        status,
        placeWhereProjectTakePlace,
        placeWhereUserCanParticipateInProject,
        projectStartingDate,
        projectEndingDate,
        projectDescription,
        personalDescription,
      });

      const savedProject = await project.save();
      return savedProject;
    } catch (error) {
      throw error;
    }
  }

  async getProjectPlace(): Promise<ResponseType> {
    return { success: true, message: new Array(ProjectPlace) };
  }

  async getProjectStatus(): Promise<ResponseType> {
    return { success: true, message: new Array(ProjectStatus) };
  }

  async getProjectBenefit(): Promise<ResponseType> {
    return { success: true, message: new Array(ProjectBenefit) };
  }

  async getProjectBudget(): Promise<ResponseType> {
    return { success: true, message: new Array(ProjectBudget) };
  }

  async getProjectCategory(): Promise<ResponseType> {
    return { success: true, message: new Array(ProjectCategory) };
  }
}
