import { useEffect, useState } from "react";
import Book from "../Components/Book";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import SideScroller from "../Components/SideScroller";
import axios from "axios";

const Home = () => {
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8081/library/${userId}`)
      .then((res) => setUser(res.data[0]))
      .catch((err) => console.log("Axios err in Library: ", err));
  }, [userId]);
  return (
    <>
      <div className="flex">
        <div className="flex flex-col h-full w-screen justify-center items-center">
          <Header />
          <div className="h-195 w-100 mt-16 rounded-xl border-stroke/0 border overflow-y-auto">
            <div className="text-basefont text-2xl font-bold mt-20">
              Good Evening, {user?.name}!
            </div>
            <div className="text-basefont mt-2">
              Explore new stories and adventures
            </div>
            <div className="mt-10">
              <SideScroller header={"Trending Now"} />
              <SideScroller header={"Today's Picks"} />
              <SideScroller header={"More to Discover"} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
