import Component from "../models/component.model.js";

// Crear un nuevo componente
export const createComponent = async (req, res) => {
    try {
        const { title, htmlCode, cssCode, description } = req.body;

        if (!title || !htmlCode || !cssCode) {
            return res.status(400).json({ message: "Title, HTML and CSS are required." });
        }

        const component = await Component.create({
            title,
            htmlCode,
            cssCode,
            description,
            author: req.user._id,
        });

        res.status(201).json(component);
    } catch (error) {
        console.error("Error creating component:", error);
        res.status(500).json({ message: "Error creating component" });
    }
};

// Obtener todos los componentes (con paginación opcional)
export const getAllComponents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const components = await Component.find()
            .populate("author", "fullName profilePic")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Component.countDocuments();

        res.status(200).json({
            components,
            page,
            totalPages: Math.ceil(total / limit),
            total,
        });
    } catch (error) {
        console.error("Error fetching components:", error);
        res.status(500).json({ message: "Error fetching components" });
    }
};

// Obtener un componente por ID
export const getComponentById = async (req, res) => {
    try {
        const component = await Component.findById(req.params.id)
            .populate("author", "fullName profilePic");
        if (!component) {
            return res.status(404).json({ message: "Component not found" });
        }
        res.status(200).json(component);
    } catch (error) {
        console.error("Error fetching component:", error);
        res.status(500).json({ message: "Error fetching component" });
    }
};

// Dar o quitar like a un componente
export const toggleLikeComponent = async (req, res) => {
    try {
        const component = await Component.findById(req.params.id);
        if (!component) {
            return res.status(404).json({ message: "Component not found" });
        }

        const userId = req.user._id;
        const liked = component.likes.includes(userId);

        if (liked) {
            component.likes.pull(userId);
        } else {
            component.likes.push(userId);
        }

        await component.save();
        res.status(200).json({ likes: component.likes, liked: !liked });
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ message: "Error toggling like" });
    }
};