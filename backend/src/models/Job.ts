import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IJob extends Document {
  title: string;
  category: 'technical' | 'non_technical';
  description?: string;
  requirements?: string;
  status?: string;
  createdAt: Date;
}

const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  category: { type: String, enum: ['technical', 'non_technical'], required: true },
  description: { type: String },
  requirements: { type: String },
  status: { type: String, default: 'open' },
  createdAt: { type: Date, default: Date.now },
});

export const Job = mongoose.model<IJob>('Job', JobSchema);
