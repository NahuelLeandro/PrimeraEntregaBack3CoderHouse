import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
    {
        name: String,
        species: String,
        age: Number,
        adopted: {
        type: Boolean,
        default: false
        },
        owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        default: null
        }
    },
    { timestamps: true }
);

export const PetModel = mongoose.model("Pet", petSchema);