import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
export default function Login(){
  const navigate = useNavigate();

  const handleNavigate=(e)=>{
    e.preventDefault();
    navigate("/register");
    };
    return (
            <LoginForm/>
    );
}