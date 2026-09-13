import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IApplication extends Document {
  jobId: Types.ObjectId;
  candidateId: Types.ObjectId;
  resumeUrl?: string;
  coverNote?: string;
  status: 'applied' | 'under_review' | 'interview' | 'rejected' | 'hired';
  createdAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  candidateId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  resumeUrl: { type: String },
  coverNote: { type: String },
  status: { type: String, enum: ['applied','under_review','interview','rejected','hired'], default: 'applied' },
  createdAt: { type: Date, default: Date.now },
});

export const Application = mongoose.model<IApplication>('Application', ApplicationSchema);
