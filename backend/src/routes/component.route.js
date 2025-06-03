import express from "express";
import {
    createComponent,
    getAllComponents,
    getComponentById,
    toggleLikeComponent,
    searchComponents
} from "../controllers/component.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Crear un componente (requiere autenticación)
router.post("/", protectRoute, createComponent);

// Obtener todos los componentes (público)
router.get("/", getAllComponents);

// Buscar componentes (público)
router.get("/search", searchComponents);

// Obtener un componente por ID (público)
router.get("/:id", getComponentById);

// Dar o quitar like a un componente (requiere autenticación)
router.post("/:id/like", protectRoute, toggleLikeComponent);

export default router;