import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(formData)
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="space-y-8 w-full max-w-md">
          {/* LOGO */}
          <div className="group flex flex-col items-center gap-2 mb-8 text-center">
            <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary/20 rounded-xl size-12 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="mt-2 font-bold text-2xl">Welcome back</h1>
            <p className="text-base-content/60">Sign in to your account</p>
          </div>
          {/* EMAIL */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="font-medium label-text">Email</span>
              </label>
              <div className="relative">
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="pl-10 input-bordered w-full input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            {/* PASSWORD */}
            <div className="form-control">
              <label className="label">
                <span className="font-medium label-text">Password</span>
              </label>
              <div className="relative">
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="pl-10 input-bordered w-full input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="right-0 absolute inset-y-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full btn btn-primary" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading ...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Dont have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginPage