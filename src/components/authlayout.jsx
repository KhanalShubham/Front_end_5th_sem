const AuthLayout = ({ children, image }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-500 items-center justify-center p-8">
        <img
          src={image}
          alt="Hope Connect"
          className="object-cover max-w-xs rounded-lg shadow-lg"
        />
      </div>
    </div>
  )
}

export default AuthLayout
