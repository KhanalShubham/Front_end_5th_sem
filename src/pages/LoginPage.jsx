import { useContext } from "react";

export default function Login(){
  const {user, loading}=useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigate=(e)=>{
    e.preventDefault();
    navigate("/register");
    };
    if(loading) return <div>Loading...</div>;
    if(user) return <div>UserAlreadyLoggedIn</div>

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <span onClick={handleNavigate}>Register</span></p>
        </div>
    );


}