import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Edit = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/library/${userId}`)
      .then((res) => setUser(res.data[0]))
      .catch((err) => console.log("Axios err in Library: ", err));
  }, [userId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/profile/${userId}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.log("Axios err in profile img: ", err));
  }, []);

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
    <div className="flex">
      <div className="flex flex-col h-full w-screen justify-center items-center">
        <div className="h-195 w-100 mt-16 rounded-xl border-stroke/20  border overflow-y-auto bg-linear-to-b from-stroke/25 to-transparent">
          <Header />
          <Footer />
          <div>
            <form className="justify-center" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={user?.username}
                className="bg-transparent h-12 w-80 border text-basefont border-stroke pl-5"
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder={user?.password}
                className="bg-transparent h-12 w-80 border text-basefont border-stroke pl-5"
                onChange={(e) => setPassword(e.target.value)}
              />
              <textarea
                type="text"
                placeholder={user?.description}
                className="bg-transparent h-30 w-80 border text-basefont border-stroke pl-5 pt-2 pr-5"
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="h-12 w-80 bg-stroke rounded-full text-basefont">
                Save Changes
              </button>
            </form>
            <button className="h-12 w-80 bg-red-800 rounded-full text-basefont">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
