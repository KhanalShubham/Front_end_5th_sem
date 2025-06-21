  import baby from "../assets/images/baby.png"
  import { Award, Globe, Heart, Shield, Sparkles, Star, Users,} from "lucide-react"
  import logo from '../assets/images/logo.png'

const AuthLayout = ({ children, colorBackground }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-green-50/30 py-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-200/20 to-green-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-emerald-200/25 to-teal-300/25 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto flex shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm max-h-[90vh]">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
          <div className="w-full max-w-md mx-auto">{children}</div>
        </div>

        {/* Right side - Text Content Only */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 items-center justify-center p-4 lg:p-6 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-12 right-12 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-12 left-12 w-10 h-10 bg-white/15 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-6 right-6">
            <Sparkles className="w-5 h-5 text-white/30 animate-spin" />
          </div>
          <div className="absolute top-1/2 left-6">
            <Star className="w-4 h-4 text-white/40 animate-pulse" />
          </div>

          {/* Main Content - Scrollable Container */}
          <div className="text-center relative z-10 w-full max-w-md mx-auto overflow-y-auto max-h-full">
            <div className="space-y-6 py-4">
              {/* Brand Section */}
              <div className="text-white space-y-4">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-white fill-current mr-3" />
                  <h2 className="text-3xl font-bold">Hope Care</h2>
                </div>

                <p className="text-lg font-light text-white/90 leading-relaxed px-4">
                  Connecting hearts, changing lives through the power of giving
                </p>

                {/* Mission Statement */}
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mx-4">
                  <p className="text-sm text-white/90 italic font-light leading-relaxed">
                    "Every donation creates a ripple of hope that transforms communities and saves lives"
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 px-4">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Shield className="w-6 h-6 text-white mb-2 mx-auto" />
                  <div className="text-sm text-white/95 font-semibold">Secure</div>
                  <div className="text-xs text-white/80">Donations</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Globe className="w-6 h-6 text-white mb-2 mx-auto" />
                  <div className="text-sm text-white/95 font-semibold">Global</div>
                  <div className="text-xs text-white/80">Impact</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Users className="w-6 h-6 text-white mb-2 mx-auto" />
                  <div className="text-sm text-white/95 font-semibold">Community</div>
                  <div className="text-xs text-white/80">Driven</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Award className="w-6 h-6 text-white mb-2 mx-auto" />
                  <div className="text-sm text-white/95 font-semibold">Trusted</div>
                  <div className="text-xs text-white/80">Platform</div>
                </div>
              </div>

              {/* Statistics */}
              <div className="flex items-center justify-center space-x-8 pt-4 border-t border-white/20 mx-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-xs text-white/80 font-medium">Donors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-xs text-white/80 font-medium">Lives Touched</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100+</div>
                  <div className="text-xs text-white/80 font-medium">Communities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Hearts */}
          <div className="absolute top-1/4 right-1/3" style={{ animation: "float 3s ease-in-out infinite" }}>
            <Heart className="w-3 h-3 text-white/30 fill-current" />
          </div>
          <div
            className="absolute bottom-1/3 left-1/4"
            style={{ animation: "float 3s ease-in-out infinite", animationDelay: "1000ms" }}
          >
            <Heart className="w-2 h-2 text-white/40 fill-current" />
          </div>
          <div
            className="absolute top-2/3 right-1/4"
            style={{ animation: "float 3s ease-in-out infinite", animationDelay: "500ms" }}
          >
            <Heart className="w-4 h-4 text-white/25 fill-current" />
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  )
}
export default AuthLayout
