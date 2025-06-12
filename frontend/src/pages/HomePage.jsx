import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useComponentStore } from "../store/useComponentStore";
import { CodeXml } from "lucide-react";
import axios from "axios";

export default function HomePage() {
  const { components, isLoading, fetchComponents } = useComponentStore();
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  useEffect(() => {
    if (selectedComponent) setShowModal(true);
    else setShowModal(false);
  }, [selectedComponent]);

  const filteredComponents = components.filter(comp => {
    const titleMatch = comp.title.toLowerCase().includes(searchText.toLowerCase());
    const authorMatch = comp.author?.fullName?.toLowerCase().includes(searchText.toLowerCase());
    return titleMatch || authorMatch;
  });

  if (isLoading) return <div className="py-10 text-center">Loading...</div>;

  return (
    <div className="bg-base-200 px-2 py-6 pt-20">
      {/* Buscador */}
      <div className="bg-base-100 shadow mx-auto mb-8 p-4 rounded-xl max-w-xl">
        <form className="flex gap-2 mb-2" onSubmit={e => e.preventDefault()}>
          <input
            className="flex-1 input-bordered input"
            placeholder="Search by title or author"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </form>
        {searchText && filteredComponents.length === 0 && (
          <div className="text-red-500 text-sm text-center">Not components found.</div>
        )}
      </div>
      {/* Fin buscador */}

      {/* Flex solo en lg+ para banners y grid */}
      <div className="lg:flex lg:justify-center lg:gap-8 mx-auto max-w-[1800px]">
        {/* Banner izquierdo */}
        <div className="hidden lg:flex flex-col items-center pr-4 w-56">
          <div className="top-1/2 sticky -translate-y-1/2">
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center items-center bg-base-100 hover:bg-base-200 shadow p-4 border rounded-xl w-48 h-64 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React"
                className="mb-4 w-20 h-20"
              />
              <div className="text-center">
                <div className="mb-1 font-bold text-base">Powered by React</div>
                <div className="text-zinc-400 text-xs">Learn more</div>
              </div>
            </a>
          </div>
        </div>
        {/* Grid de componentes */}
        <div className="flex-1">
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto px-2 lg:px-0 max-w-7xl">
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
        </div>
        {/* Banner derecho */}
        <div className="hidden lg:flex flex-col items-center pl-4 w-56">
          <div className="top-1/2 sticky -translate-y-1/2">
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center items-center bg-base-100 hover:bg-base-200 shadow p-4 border rounded-xl w-48 h-64 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                alt="Tailwind CSS"
                className="mb-4 w-20 h-20"
              />
              <div className="text-center">
                <div className="mb-1 font-bold text-base">Styled with TailwindCSS</div>
                <div className="text-zinc-400 text-xs">Discover Tailwind</div>
              </div>
            </a>
          </div>
        </div>
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