import { useEffect } from "react";
import { useComponentStore } from "../store/useComponentStore";

export default function HomePage() {
  const { components, isLoading, fetchComponents } = useComponentStore();

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  if (isLoading) return <div className="text-center py-10">Cargando...</div>;

  return (
    <div className="min-h-screen bg-base-200 px-2 py-6 pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {components.map((comp) => (
          <div
            key={comp._id}
            className="bg-base-100 rounded-lg shadow flex flex-col items-center justify-center w-full h-64 min-h-[220px] max-w-sm mx-auto break-words p-5"
          >
            <style>{comp.cssCode}</style>
            <h3 className="font-semibold text-base mb-3 text-center truncate w-full">{comp.title}</h3>
            <div
              className="mb-3 flex-1 flex items-center justify-center w-full"
              dangerouslySetInnerHTML={{ __html: comp.htmlCode }}
            />
            <small className="text-gray-400 mt-auto text-xs text-center w-full">
              Autor: {comp.author?.fullName || "Anónimo"}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}