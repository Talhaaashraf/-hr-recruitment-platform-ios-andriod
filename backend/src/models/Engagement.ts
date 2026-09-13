import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IEngagement extends Document {
  clientId: Types.ObjectId;
  serviceId: Types.ObjectId;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date;
}

const EngagementSchema = new Schema<IEngagement>({
  clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export const Engagement = mongoose.model<IEngagement>('Engagement', EngagementSchema);
