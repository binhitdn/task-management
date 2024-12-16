import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  category: string;
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
}

const TaskSchema: Schema<ITask> = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;
