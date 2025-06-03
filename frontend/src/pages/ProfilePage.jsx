import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Github, Linkedin, Instagram, CodeXml, Settings } from "lucide-react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { authUser } = useAuthStore();
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [userComponents, setUserComponents] = useState([]);
    const [loadingComponents, setLoadingComponents] = useState(true);

    // Modal states
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`/api/users/${userId}`).then(res => {
            setUser(res.data);
            setLoadingUser(false);
        }).catch(() => {
            setUser(null);
            setLoadingUser(false);
        });
    }, [userId]);

    useEffect(() => {
        setLoadingComponents(true);
        axios.get(`/api/components?author=${userId}`).then(res => {
            setUserComponents(res.data.components || []);
            setLoadingComponents(false);
        }).catch(() => {
            setUserComponents([]);
            setLoadingComponents(false);
        });
    }, [userId]);

    useEffect(() => {
        if (selectedComponent) setShowModal(true);
        else setShowModal(false);
    }, [selectedComponent]);

    if (loadingUser) return <div className="pt-20 text-center">Cargando perfil...</div>;
    if (!user) return <div className="pt-20 text-red-500 text-center">Usuario no encontrado</div>;

    const isOwnProfile = authUser?._id === userId;

    return (
        <div className="bg-base-200 pt-20 min-h-screen">
            <div className="mx-auto p-4 max-w-3xl">
                {/* Perfil */}
                <div className="flex flex-col items-center gap-2 mb-6">
                    <img
                        src={user.profilePic || "/avatar.png"}
                        alt={user.fullName}
                        className="border-4 rounded-full w-28 h-28 object-cover"
                    />
                    <h2 className="font-bold text-2xl">{user.fullName}</h2>
                    <p className="text-zinc-400 text-sm">{user.email}</p>
                    {/* Social icons + settings */}
                    <div className="flex items-center gap-4 mt-2">
                        {user.github && (
                            <a href={user.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github className="w-6 h-6 text-zinc-500 hover:text-black transition" />
                            </a>
                        )}
                        {user.linkedin && (
                            <a href={user.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin className="w-6 h-6 text-zinc-500 hover:text-blue-700 transition" />
                            </a>
                        )}
                        {user.instagram && (
                            <a href={user.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram className="w-6 h-6 text-zinc-500 hover:text-pink-500 transition" />
                            </a>
                        )}
                        {isOwnProfile && (
                            <button
                                className="hover:bg-base-200 ml-2 p-2 rounded-full transition"
                                aria-label="Editar perfil"
                                onClick={() => navigate("/profile/settings")}
                                type="button"
                            >
                                <Settings className="w-6 h-6 text-zinc-500 hover:text-primary transition" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Línea separadora */}
                <hr className="my-8 border-zinc-700" />

                {/* Componentes del usuario */}
                <h3 className="mb-4 font-semibold text-lg text-center">Componentes de {user.fullName}</h3>
                {loadingComponents ? (
                    <div className="py-10 text-center">Cargando componentes...</div>
                ) : userComponents.length === 0 ? (
                    <div className="py-10 text-zinc-400 text-center">Este usuario no ha publicado componentes.</div>
                ) : (
                    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {userComponents.map((comp) => (
                            <div
                                key={comp._id}
                                className="relative flex flex-col justify-center items-center bg-base-100 shadow mx-auto p-4 rounded-lg w-full max-w-xs h-56 min-h-[180px] break-words"
                            >
                                <style>{comp.cssCode}</style>
                                <h4 className="mb-2 w-full font-semibold text-base text-center truncate">{comp.title}</h4>
                                <div
                                    className="flex flex-1 justify-center items-center w-full"
                                    dangerouslySetInnerHTML={{ __html: comp.htmlCode }}
                                />
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
                )}

                {/* Modal para ver el código */}
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
        </div>
    );
};

export default ProfilePage;