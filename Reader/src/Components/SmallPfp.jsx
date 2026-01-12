import { useNavigate } from "react-router-dom";

const SmallPfp = ({ profileImg, userId }) => {
  const navigate = useNavigate();
  return (
    <div
      className="h-10 w-10 rounded-full bg-stroke/20 shrink-0 overflow-hidden"
      onClick={() => {
        navigate(`/library/${userId}`);
      }}
    >
      <img src={profileImg} alt="" className="object-cover h-10 w-10" />
    </div>
  );
};

export default SmallPfp;
