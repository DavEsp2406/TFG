import { useState } from "react";
import { useComponentStore } from "../store/useComponentStore";
import { useNavigate } from "react-router-dom";

const UploadComponent = () => {
    const { uploadComponent, isLoading } = useComponentStore();
    const [title, setTitle] = useState("");
    const [htmlCode, setHtmlCode] = useState("");
    const [cssCode, setCssCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !htmlCode.trim()) {
            setError("El título y el código HTML son obligatorios.");
            return;
        }
        setError("");
        try {
            await uploadComponent({ title, htmlCode, cssCode });
            navigate("/");
        } catch (err) {
            setError("Error al crear el componente.");
        }
    };

    return (
        <div className="pt-20 min-h-screen">
            <div className="mx-auto p-4 py-8 max-w-2xl">
                <div className="space-y-8 bg-base-300 p-6 rounded-xl">
                    <div className="text-center">
                        <h1 className="font-semibold text-2xl">Nuevo componente</h1>
                        <p className="mt-2">Completa el formulario para publicar tu componente</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label className="block font-medium text-zinc-400 text-sm">Título</label>
                            <input
                                className="input-bordered w-full input"
                                placeholder="Título del componente"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block font-medium text-zinc-400 text-sm">Código HTML</label>
                            <textarea
                                className="textarea-bordered w-full textarea"
                                placeholder="<button>Mi botón</button>"
                                value={htmlCode}
                                onChange={e => setHtmlCode(e.target.value)}
                                rows={5}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block font-medium text-zinc-400 text-sm">Código CSS (opcional)</label>
                            <textarea
                                className="textarea-bordered w-full textarea"
                                placeholder={`.btn { background: #000; color: #fff; }`}
                                value={cssCode}
                                onChange={e => setCssCode(e.target.value)}
                                rows={3}
                                disabled={isLoading}
                            />
                        </div>

                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <button
                            className="w-full btn btn-primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Publicando..." : "Publicar componente"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadComponent;