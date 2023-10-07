import { Schema, type Document, type Types, model } from 'mongoose';
import { ProjectPlace } from '@domain/interfaces/project/project-place.interface';
import { ProjectStatus } from '@domain/interfaces/project/project-status.interface';

export interface ProjectDocument extends Document {
  title: string;
  author: Types.ObjectId;
  status: ProjectStatus;
  placeWhereProjectTakePlace: ProjectPlace;
  placeWhereUserCanParticipateInProject: ProjectPlace;
  projectStartingDate: Date;
  projectEndingDate: Date;
  projectDescription: string;
  personalDescription: string;
  favoriteByUsers: Types.ObjectId[];
}

const projectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      required: true,
    },
    placeWhereProjectTakePlace: {
      type: String,
      enum: Object.values(ProjectPlace),
      required: true,
    },
    placeWhereUserCanParticipateInProject: {
      type: String,
      enum: Object.values(ProjectPlace),
      required: true,
    },
    projectStartingDate: { type: Date, required: true },
    projectEndingDate: { type: Date, required: true },
    projectDescription: { type: String, required: true },
    personalDescription: { type: String, required: true },
    favoriteByUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const ProjectModel = model<ProjectDocument>('Project', projectSchema);
