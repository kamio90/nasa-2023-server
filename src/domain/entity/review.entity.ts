import { AnswerCategory } from '@domain/interfaces/review/answer-category.interface';
import { QuestionCategory } from '@domain/interfaces/review/question-category.interface';
import { type Document, Schema, model } from 'mongoose';

export interface Review extends Document {
  scale: number;
  avgMark: AnswerCategory;
  category: QuestionCategory;
}

const ReviewSchema: Schema = new Schema({
  scale: { type: Number, required: true },
  avgMark: {
    type: String,
    enum: Object.values(AnswerCategory),
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(QuestionCategory),
    required: true,
  },
});

export const ReviewModel = model<Review>('Review', ReviewSchema);
