import { useState } from "react";
import axios from "axios";

const ComponentSearch = () => {
    const [searchId, setSearchId] = useState("");
    const [component, setComponent] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setComponent(null);
        setError("");
        setLoading(true);
        try {
            const res = await axios.get(`/api/components/${searchId}`);
            setComponent(res.data);
        } catch (err) {
            setError("Componente no encontrado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-base-200 shadow mx-auto my-10 p-6 rounded-xl max-w-xl">
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <input
                    className="flex-1 input-bordered input"
                    placeholder="Introduce el ID del componente"
                    value={searchId}
                    onChange={e => setSearchId(e.target.value)}
                />
                <button className="btn btn-primary" type="submit" disabled={loading || !searchId}>
                    Buscar
                </button>
            </form>
            {loading && <div className="text-center">Buscando...</div>}
            {error && <div className="text-red-500 text-center">{error}</div>}
            {component && (
                <div className="bg-base-100 shadow mt-4 p-4 rounded-lg">
                    <h2 className="mb-2 font-bold text-lg">{component.title}</h2>
                    <div className="mb-2 text-zinc-500 text-sm">Autor: {component.author?.fullName}</div>
                    <style>{component.cssCode}</style>
                    <div
                        className="mb-2 p-2 border rounded"
                        dangerouslySetInnerHTML={{ __html: component.htmlCode }}
                    />
                    <div>
                        <label className="block mb-1 font-semibold text-xs">HTML</label>
                        <pre className="bg-base-200 p-2 rounded max-h-40 overflow-auto text-xs">{component.htmlCode}</pre>
                    </div>
                    <div className="mt-2">
                        <label className="block mb-1 font-semibold text-xs">CSS</label>
                        <pre className="bg-base-200 p-2 rounded max-h-40 overflow-auto text-xs">{component.cssCode || "// Sin CSS"}</pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComponentSearch;