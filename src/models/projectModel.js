
import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
        {
                name:{
                        type: String,
                        require: true,
                        unique: true,
                        lowercase: true,
                        trim: true
                },
                description: {
                        type: String
                },
                user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        require: true

                },
        },
        {
                timestapms: true
        }
);

export const Project = mongoose.model("Project", projectSchema);

