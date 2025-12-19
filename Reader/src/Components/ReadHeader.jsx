import { useEffect, useState } from "react";
import SmallPfp from "./SmallPfp";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "./BackButton";

const ReadHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [users, setUsers] = useState([]);
  const [book, setBook] = useState([]);
  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/profile/${id}`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log("Axios err in volumes: ", err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/bookprofile/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.log("Axios err in volumes: ", err));
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-15 ${
        scrolled
          ? "bg-base shadow-2xl border-b border-stroke/50"
          : "transparent"
      }`}
    >
      <div className="flex items-center justify-between pr-10 pl-10 h-15 font-bold text-basefont text-3xl">
        <BackButton />
        <h1 className="text-lg">{book.name}</h1>
        <SmallPfp key={users.id} profileImg={users.profileImg} />
      </div>
    </div>
  );
};

export default ReadHeader;
