import {useState} from "react"
import { useAuthStore } from "../store/useAuthStore"
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  })

  const {signup, isSigningUp} = useAuthStore()

  const validateForm = () => {}
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/*left side*/}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="space-y-8 w-full max-w-md">
          {/* LOGO */}
          <div className="mb-8 text-center">
            <div className="group flex flex-col items-center gap-2">
              <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary/20 rounded-xl size-12 transition-colors">
                <MessageSquare className="size-6 text-primary"/>
              </div>
              <h1 className="mt-2 font-bold text-2xl">Create account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="font-medium label-text">Full Name</span>
              </label>
              <div className="relative">
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="pl-10 input-bordered w-full input"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

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
            <button type="submit" className="w-full btn btn-primary" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading ...
                </>
              ): (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to= "/login" className="link link-primary">
              Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default SignUpPage