import { useParams } from "react-router-dom";
import BackButton from "../Components/BackButton";
import BookDetails from "../Components/BookDetails";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import ChapterCard from "../Components/ChapterCard";

const Chapter = () => {
  const { id } = useParams();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/bookprofile/${id}`)
      .then((res) => {
        // const sorted = res.data.sort((a, b) => a.id - b.id);
        console.log("DATA: ", res.data);
        setBooks(res.data);
      })
      .catch((err) => console.log("AXIOS ERROR: ", err));
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col h-full w-screen justify-center items-center pb-10">
        <Header />
        <div className="h-195 w-100 mt-16 rounded-xl border-stroke/20  border overflow-y-auto bg-linear-to-b from-stroke/25 to-transparent flex justify-center">
          <div className="">
            <div className="flex -mb-15 mt-5">
              <BackButton
                properties={`h-10 w-10 rounded-full bg-linear-to-t from-stroke to-base/25 border border-stroke flex items-center justify-center`}
              />
            </div>
            <BookDetails id={id} headerAlign={5} />
            <div className="mt-5 mb-10 h-relative pb-5">
              <ChapterCard />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Chapter;
