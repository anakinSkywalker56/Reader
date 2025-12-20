import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Read() {
  const { volumeId, chapterNum } = useParams();

  //   const [chapters, setChapters] = useState([]);

  const [chapter, setChapter] = useState({});

  useEffect(() => {
    console.log("Requesting:", volumeId, chapterNum);
    axios
      .get(
        `http://localhost:8081/chapters/volume/${volumeId}/chapter/${chapterNum}`
      )
      .then((res) => {
        console.log("Chapter response:", res.data);
        setChapter(res.data);
      })
      .catch((err) => console.log("Axios err in chapters: ", err));
  }, [volumeId, chapterNum]);

  return (
    <div className="flex">
      <div className="flex flex-col h-full w-screen justify-center items-center">
        <div className="h-195 w-100 mt-16 p-5 rounded-xl border-stroke/20  border overflow-y-auto bg-linear-to-b from-stroke/25 to-transparent overflow-x-hidden">
          <Header />
          <Footer />
          {chapter ? (
            <div>
              <h2 className="text-2xl font-bold text-basefont">
                {chapter.chapterTitle}
              </h2>
              <p className="text-xl text-basefont">{chapter.content}</p>
            </div>
          ) : (
            <p>Loading chapter...</p>
          )}
        </div>
      </div>
    </div>
  );
}
