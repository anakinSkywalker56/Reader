import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChapterButton from "./ChapterButton";

const ChapterCard = () => {
  const { id } = useParams();

  const [chapters, setChapters] = useState([]);
  console.log("Chapters page volumeId:", id);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/chapters/volume/${id}`)
      .then((res) => setChapters(res.data))
      .catch((err) => console.log("Axios err in volumes: ", err));
  }, [id]);

  return (
    <div>
      <div className="h-100 w-90 bg-base border-stroke/50 border rounded-2xl overflow-y-auto overflow-x-hidden">
        {chapters.map((chapters) => (
          <ChapterButton
            key={chapters.id}
            chapterNum={chapters.chapterNum}
            chapterName={chapters.chapterTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default ChapterCard;
