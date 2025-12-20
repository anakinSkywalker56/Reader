import { useNavigate, useParams } from "react-router-dom";

const ChapterButton = ({ chapterNum, chapterName }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // this is the volumeId from /volumes/:id/chapters

  return (
    <div>
      <div
        className="h-15 w-90 border-b border-stroke/50 flex items-center pl-5 text-basefont"
        onClick={() => {
          console.log("Navigating with:", id, chapterNum);
          navigate(`/read/${id}/${chapterNum}`); // use id as volumeId
        }}
      >
        <div>
          Chapter {chapterNum}: {chapterName}
        </div>
      </div>
    </div>
  );
};

export default ChapterButton;
