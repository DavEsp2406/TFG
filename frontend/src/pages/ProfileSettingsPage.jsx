import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Github, Linkedin, Instagram, Camera, Mail, User } from "lucide-react";

const ProfileSettingsPage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()

  const [selectedImage, setSelectedImage] = useState(null)
  const [linkedin, setLinkedin] = useState(authUser.linkedin || "")
  const [instagram, setInstagram] = useState(authUser.instagram || "")
  const [github, setGithub] = useState(authUser.github || "")

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const base64Image = reader.result
      setSelectedImage(base64Image)
      await updateProfile({ profilePic: base64Image })
    }
  }

  const handleSocialsSave = async (e) => {
    e.preventDefault()
    await updateProfile({ linkedin, instagram, github })
  }

  return (
    <div className="pt-20 h-full">
      <div className="mx-auto p-4 py-8 max-w-2xl">
        <div className="space-y-8 bg-base-300 p-6 rounded-xl">
          <div className="text-center">
            <h1 className="font-semibold text-2xl">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img src={selectedImage || authUser.profilePic || "/avatar.png"} alt="Profile" className="border-4 rounded-full size-32 object-cover" />
              <label htmlFor="avatar-upload" className={`right-0 bottom-0 absolute bg-base-content p-2 rounded-full hover:scale-105 transition-all cursor-pointer duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
                <Camera className="size-5 text-base-200" />
                <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUpdatingProfile} />
              </label>
            </div>
            <p className="text-zinc-400 text-sm">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSocialsSave}>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <User className="size-4" />
                Full Name
              </div>
              <p className="bg-base-200 px-4 py-2.5 border rounded-lg">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <Mail className="size-4" />
                Email Address
              </div>
              <p className="bg-base-200 px-4 py-2.5 border rounded-lg">{authUser?.email}</p>
            </div>

            {/* Social Links */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <Linkedin className="size-4" />
                LinkedIn
              </div>
              <input
                className="input-bordered w-full input"
                placeholder="https://linkedin.com/in/usuario"
                value={linkedin}
                onChange={e => setLinkedin(e.target.value)}
                disabled={isUpdatingProfile}
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <Instagram className="size-4" />
                Instagram
              </div>
              <input
                className="input-bordered w-full input"
                placeholder="https://instagram.com/usuario"
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
                disabled={isUpdatingProfile}
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <Github className="size-4" />
                GitHub
              </div>
              <input
                className="input-bordered w-full input"
                placeholder="https://github.com/usuario"
                value={github}
                onChange={e => setGithub(e.target.value)}
                disabled={isUpdatingProfile}
              />
            </div>

            <button
              className="mt-2 w-full btn btn-primary"
              type="submit"
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? "Guardando..." : "Guardar cambios"}
            </button>
          </form>

          <div className="bg-base-300 mt-6 p-6 rounded-xl">
            <h2 className="mb-4 font-medium text-lg">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-zinc-700 border-b">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettingsPage;