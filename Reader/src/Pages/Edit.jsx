import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import BackButton from "../Components/BackButton";

const Edit = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [profileBg, setProfileBg] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:8081/updateUser", {
        id: userId,
        name: name || user.name, // or add an input for name
        username: username || user.username, // fallback
        password: password || user.password, // fallback
        description: description || user.description, // fallback
      });

      await axios.post("http://localhost:8081/updateProfile", {
        id: profile.id,
        profileImg: profileImg || profile.profileImg, // fallback
        profileBg: profileBg || profile.profileBg, // fallback
      });

      alert("Profile updated successfully!");
      navigate(`/home/${userId}`);
    } catch (err) {
      console.log("Update error:", err);
      alert("Something went wrong updating your profile.");
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col h-full w-screen justify-center items-center">
        <div className="h-195 w-100 mt-16 rounded-xl border-stroke/20  border overflow-y-auto bg-linear-to-b from-stroke/25 to-transparent">
          <Header />
          <Footer />
          <div className="flex w-relative justify-center pt-5 ">
            <div className="w-80">
              <div className="absolute -ml-5">
                <BackButton />
              </div>
              <div className="text-basefont text-2xl font-bold mb-10 pl-10">
                Edit Profile
              </div>

              <form className="justify-center" onSubmit={handleSubmit}>
                <div className="text-basefont text-md">Display Name</div>

                <input
                  type="text"
                  placeholder={user?.name}
                  className="bg-transparent h-12 w-80 border text-basefont border-stroke pl-5"
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="text-basefont text-md">Username</div>

                <input
                  type="text"
                  placeholder={user?.username}
                  className="bg-transparent h-12 w-80 border text-basefont border-stroke pl-5"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="text-basefont text-md">Password</div>

                <input
                  type="password"
                  placeholder={user?.password}
                  className="bg-transparent h-12 w-80 border text-basefont border-stroke pl-5"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-basefont text-md">Bio</div>

                <textarea
                  type="text"
                  placeholder={user?.description}
                  className="bg-transparent h-30 w-80 border text-basefont border-stroke pl-5 pt-2 pr-5"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="text-basefont text-md">
                  Profile Picture Link
                </div>

                <input
                  type="text"
                  placeholder={profile?.profileImg}
                  className="bg-transparent h-12 w-80 border text-basefont border-stroke pl-5"
                  onChange={(e) => setProfileImg(e.target.value)}
                />
                <div className="text-basefont text-md">
                  Background Picture Link
                </div>

                <input
                  type="text"
                  placeholder={profile?.profileBg}
                  className="bg-transparent h-12 w-80 border text-basefont border-stroke pl-5"
                  onChange={(e) => setProfileBg(e.target.value)}
                />
                <button className="h-12 w-80 bg-stroke rounded-full text-basefont mt-10">
                  Save Changes
                </button>
              </form>
              <button
                className="h-12 w-80 bg-red-800 rounded-full text-basefont mt-2"
                onClick={async () => {
                  try {
                    console.log("User: ", userId);
                    const response = await fetch(
                      "http://localhost:8081/deleteUser",
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId: userId }), // replace with actual user id
                      }
                    );
                    console.log("Fetched");
                    if (response.ok) {
                      alert("Account deleted successfully!");
                      navigate(`/`);
                    } else {
                      alert("Failed to delete account.");
                    }
                  } catch (error) {
                    console.error("Error deleting account:", error);
                  }
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
