import { useEffect, useState } from "react";
import BackButton from "../Components/BackButton";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import SideScroller from "../Components/SideScroller";
import { useParams } from "react-router-dom";
import axios from "axios";

const Library = () => {
  // const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8081/library/${userId}`)
      .then((res) => setUser(res.data[0]))
      .catch((err) => console.log("Axios err in Library: ", err));
  }, [userId]);

  return (
    <div className="flex">
      <div className="flex flex-col h-full w-screen justify-center items-center">
        <div className="h-195 w-100 mt-16 rounded-xl border-stroke/20  border overflow-y-auto bg-linear-to-b from-stroke/25 to-transparent">
          <Header />
          <Footer />
          <div className="h-15 w-relative items-center flex pl-2">
            <BackButton />
            <div className="h-15 pl-5 flex items-center">
              <div className=" text-2xl text-basefont">{user?.name}</div>
            </div>
          </div>
          <div className="w-relative h-50 bg-amber-200">{}</div>
          <div className="bg-stroke h-40 w-40 rounded-full flex -mt-20 ml-5">
            {}
          </div>
          <div className="w-100 h-50">
            <div className="h-50 pl-12 pt-2">
              <div className="text-basefont text-3xl">{user.name}</div>
              <div className="text-basefont/50 text-xl">{user.username}</div>
              <div className="w-60 h-20">
                <div className="text-basefont/50 text-sm">
                  {user.description}
                </div>
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
          <div className="mt-10">
            <SideScroller header={"Continue Reading"} />
            <SideScroller header={"Saved Books"} />
            <SideScroller header={"Continue Reading"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
