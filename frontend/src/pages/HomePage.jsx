import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useComponentStore } from "../store/useComponentStore";
import { CodeXml } from "lucide-react";
import axios from "axios";

export default function HomePage() {
  const { components, isLoading, fetchComponents } = useComponentStore();
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Estado para el buscador por texto (título o autor)
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  useEffect(() => {
    if (selectedComponent) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [selectedComponent]);

  // Filtrado en el frontend
  const filteredComponents = components.filter(comp => {
    const titleMatch = comp.title.toLowerCase().includes(searchText.toLowerCase());
    const authorMatch = comp.author?.fullName?.toLowerCase().includes(searchText.toLowerCase());
    return titleMatch || authorMatch;
  });

  if (isLoading) return <div className="py-10 text-center">Cargando...</div>;

  return (
    <div className="bg-base-200 px-2 py-6 pt-20 min-h-screen">
      {/* Buscador de componentes por título o autor */}
      <div className="bg-base-100 shadow mx-auto mb-8 p-4 rounded-xl max-w-xl">
        <form className="flex gap-2 mb-2" onSubmit={e => e.preventDefault()}>
          <input
            className="flex-1 input-bordered input"
            placeholder="Buscar por título o autor"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </form>
        {searchText && filteredComponents.length === 0 && (
          <div className="text-red-500 text-sm text-center">No se encontraron componentes.</div>
        )}
      </div>
      {/* Fin del buscador */}

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto max-w-7xl">
        {filteredComponents.map((comp) => (
          <div
            key={comp._id}
            className="relative flex flex-col justify-center items-center bg-base-100 shadow mx-auto p-5 rounded-lg w-full max-w-sm h-64 min-h-[220px] break-words"
          >
            <style>{comp.cssCode}</style>
            <h3 className="mb-3 w-full font-semibold text-base text-center truncate">{comp.title}</h3>
            <div
              className="flex flex-1 justify-center items-center mb-3 w-full"
              dangerouslySetInnerHTML={{ __html: comp.htmlCode }}
            />
            <small className="mt-auto w-full text-gray-400 text-xs text-center">
              Autor: {comp.author?._id ? (
                <Link
                  to={`/profile/${comp.author._id}`}
                  className="text-primary hover:underline"
                >
                  {comp.author.fullName}
                </Link>
              ) : "Anónimo"}
            </small>
            {/* Icono abajo a la derecha */}
            <button
              className="right-3 bottom-3 absolute hover:bg-base-200 p-2 rounded-full transition"
              onClick={() => setSelectedComponent(comp)}
              type="button"
              aria-label="Ver código"
            >
              <CodeXml className="w-5 h-5 text-base" />
            </button>
          </div>
        ))}
      </div>
      {/* Modal */}
      {selectedComponent && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/40">
          <div
            className={`
        relative bg-base-100 shadow-xl p-6 rounded-xl w-full max-w-lg
        transition-all duration-500
        ${showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        max-h-[80vh] overflow-y-auto
      `}
            style={{ transitionProperty: "transform, opacity" }}
          >
            <button
              className="top-3 right-3 absolute btn btn-sm btn-circle"
              onClick={() => setSelectedComponent(null)}
            >✕</button>
            <h2 className="mb-4 font-bold text-xl">{selectedComponent.title}</h2>
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-xs">HTML</label>
              <pre className="bg-base-200 p-2 rounded max-h-60 overflow-auto text-xs">
                {selectedComponent.htmlCode}
              </pre>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-xs">CSS</label>
              <pre className="bg-base-200 p-2 rounded max-h-60 overflow-auto text-xs break-words whitespace-pre-line">
                {selectedComponent.cssCode || "// Sin CSS"}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}