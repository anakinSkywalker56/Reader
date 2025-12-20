import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Volume from "../Components/Volume";
import axios from "axios";
import BackButton from "../Components/BackButton";
import BookDetails from "../Components/BookDetails";
import { useParams } from "react-router-dom";

const BookProfile = () => {
  const { id } = useParams();

  const [volumes, setVolumes] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/bookprofile/${id}/volumes`)
      .then((res) => setVolumes(res.data))
      .catch((err) => console.log("Axios err in volumes: ", err));
  }, [id]);

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
              {volumes.map((volumes) => (
                <Volume
                  key={volumes.id}
                  volNum={volumes.volNum}
                  volName={volumes.volName}
                  volPic={books.imageLink}
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BookProfile;

/**
 * Template
 * 
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const BookProfile = () => {
  return (
    <div className="flex">
      <div className="flex flex-col h-full w-screen justify-center items-center">
        <div className="h-195 w-100 mt-16 rounded-xl border-stroke/20  border overflow-y-auto bg-linear-to-b from-stroke/25 to-transparent">
          <Header />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default BookProfile;

 */
