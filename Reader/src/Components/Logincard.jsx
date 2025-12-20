import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", { username, password })
      .then((res) => {
        if (res.data.message === "Login Successful") {
          localStorage.setItem("userId", res.data.user.id);
          navigate(`/home/${userId}`);
        } else {
          alert("Username or Password incorrect");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col">
      <div className="flex text-basefont text-4xl font-bold mb-5">Reader.</div>
      <div className="h-180 w-100 bg-base shadow-2xl shadow-black/70 rounded-2xl p-10">
        <div className="text-basefont text-2xl">Login</div>
        <br />
        <div className="text-basefont text-md">Username</div>
        <form className="justify-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="bg-transparent h-12 w-80 border text-basefont border-stroke pl-5"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <div className="text-basefont text-md mt-2">Password</div>
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent h-12 w-80 border text-basefont border-stroke pl-5"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="h-12 w-80 bg-stroke rounded-full text-basefont mt-2">
            Login
          </button>
        </form>
        <br />

        <div className="text-basefont text-md mt-2">
          No account{" "}
          <span className="text-stroke" onClick={() => navigate(`register`)}>
            Sign up
          </span>
        </div>

        <div className="justify-center bottom-0 mt-20">
          <p className="text-center leading-none text-stroke/30">
            By continuing, you agree to Reader’s Terms of Service and
            acknowledge you've read our Privacy Policy. Notice at collection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
