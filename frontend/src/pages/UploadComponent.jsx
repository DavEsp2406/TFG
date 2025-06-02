import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComponentStore } from "../store/useComponentStore";

export default function UploadComponent() {
    const [title, setTitle] = useState("");
    const [htmlCode, setHtmlCode] = useState("");
    const [cssCode, setCssCode] = useState("");
    const [error, setError] = useState("");
    const { uploadComponent } = useComponentStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !htmlCode) {
            setError("El título y el código HTML son obligatorios.");
            return;
        }
        try {
            await uploadComponent({ title, htmlCode, cssCode });
            navigate("/");
        } catch (err) {
            setError("Error al crear el componente.");
        }
    };

    return (
        <div className="bg-base-100 shadow mx-auto mt-24 p-8 rounded max-w-xl">
            <h2 className="mb-6 font-bold text-2xl">Crear nuevo componente</h2>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    className="input-bordered input"
                    placeholder="Título"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    className="textarea-bordered textarea"
                    placeholder="Código HTML"
                    value={htmlCode}
                    onChange={e => setHtmlCode(e.target.value)}
                    rows={5}
                />
                <textarea
                    className="textarea-bordered textarea"
                    placeholder="Código CSS (opcional)"
                    value={cssCode}
                    onChange={e => setCssCode(e.target.value)}
                    rows={3}
                />
                <button className="btn btn-primary" type="submit">
                    Crear
                </button>
            </form>
        </div>
    );
}