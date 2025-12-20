import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // "User registered successfully!"
        navigate(`/`);
        setName("");
        setUsername("");
        setPassword("");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Error registering user:", err);
      alert("Server error");
    }
  };

  return (
    <div className="w-screen flex justify-center items-center h-screen">
      <div>
        <div className="flex text-basefont text-4xl font-bold mb-5">
          Register
        </div>
        <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent h-12 w-80 border text-basefont border-stroke pl-5"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-transparent h-12 w-80 border text-basefont border-stroke pl-5"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent h-12 w-80 border text-basefont border-stroke pl-5"
          />
          <button
            type="submit"
            className="h-12 w-80 bg-stroke rounded-full text-white mt-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
