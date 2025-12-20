import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import axios from "axios";
import SideScroller from "./SideScroller";
import { useNavigate, useParams } from "react-router-dom";

const UserProfileDetails = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});

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

  return (
    <div>
      <div className="h-15 w-relative items-center flex pl-2">
        <BackButton />
        <div className="h-15 pl-5 flex items-center">
          <div className=" text-2xl text-basefont">{user?.name}</div>
        </div>
      </div>
      <div className="w-relative h-50 bg-stroke/20 flex justify-center overflow-hidden items-center">
        <img src={profile?.profileBg} alt="Bg" />
      </div>
      <div className="bg-stroke/20 h-40 w-40 rounded-full   -mt-20 ml-5 flex justify-center overflow-hidden items-center">
        <img src={profile?.profileImg} alt="pfp" />
      </div>
      <div
        className="flex justify-end text-basefont text-sm pr-10"
        onClick={() => {
          navigate("/edit");
        }}
      >
        <div className="h-7 w-22 rounded-xl bg-linear-to-t from-stroke/40 to-base/25 border border-stroke flex items-center justify-center">
          Edit Profile
        </div>
      </div>
      <div className="w-100 h-50 -mt-7">
        <div className="h-50 pl-12 pt-2">
          <div className="text-basefont text-3xl">{user.name}</div>
          <div className="text-basefont/50 text-xl">{user.username}</div>
          <div className="w-60 h-20">
            <div className="text-basefont/50 text-sm">{user.description}</div>
          </div>
          <div className="flex text-basefont/50 gap-20">
            <div>Reader</div>
            <div>
              Joined{" "}
              {new Date(user?.date_joined).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="flex text-basefont/50 gap-20">
            <div>{user.streak} Days Streak</div>
            <div>0 Achievements</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetails;
