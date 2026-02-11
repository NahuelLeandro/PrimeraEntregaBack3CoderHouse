import mongoose from "mongoose";

// const adoptionSchema = new mongoose.Schema(
//     {
//         owner: {
//             type: mongoose.SchemaTypes.ObjectId,
//             ref: "User",
//             required: true
//         },
//         pet: {
//             type: mongoose.SchemaTypes.ObjectId,
//             ref: "Pet",
//             required: true,
//             unique: true // 👈 evita que un pet tenga 2 adopciones
//         }
//     },
//     { timestamps: true }
// );


const adoptionSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User", required: true 
        },
        pet: { 
            type: mongoose.SchemaTypes.ObjectId, 
            ref: "Pet", required: true, unique: true 
        },
        adoptedAt: { 
            type: Date, default: Date.now 
        },
        status: { type: String, enum: ["active", "returned"], 
        default: "active" 
        }
    },
    { timestamps: true }
);




export const AdoptionModel = mongoose.model("Adoption", adoptionSchema);
