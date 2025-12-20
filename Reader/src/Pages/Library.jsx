import { useEffect, useState } from "react";
import BackButton from "../Components/BackButton";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import SideScroller from "../Components/SideScroller";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserProfileDetails from "../Components/UserProfileDetails";

const Library = () => {
  // const { id } = useParams();

  return (
    <div className="flex">
      <div className="flex flex-col h-full w-screen justify-center items-center">
        <div className="h-195 w-100 mt-16 rounded-xl border-stroke/20  border overflow-y-auto bg-linear-to-b from-stroke/25 to-transparent">
          <Header />
          <Footer />
          <div>
            <UserProfileDetails />
          </div>
          <div className="mt-10 p-2 gap-5 space-y-5">
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
