

import mongoose, { Schema } from "mongoose";


const taskSchema = new Schema(
        {
                name: {
                        type: String,
                        required: true
                },
                description: {
                        type: String
                },
                status: {
                        type:String,
                        enum: ["Backlog", "In Discussion", "In Progress", "Done"],
                        dufault: "Backlog"
                },
                tags: {
                        type: [String]
                },
                dueDate: {
                        type: Date
                },
                assignedUser: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"

                },
                project: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Project",
                        required: true

                }
        },
        {
                timestamps: true
        }
);

export const Task = mongoose.model('Task', taskSchema);
