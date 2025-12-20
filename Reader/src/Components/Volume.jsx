import { useNavigate, useParams } from "react-router-dom";

const Volume = ({ volNum, volName, volPic }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div
      className=" flex flex-col h-30 w-90 bg-stroke/20 mt-2 rounded-xl overflow-hidden"
      onClick={() => {
        navigate(`/volumes/${id}/chapters`);
      }}
    >
      <div className="relative w-90">
        <div className="absolute text-basefont w-90 items-center text-1xl font-bold p-10 z-10">
          Volume {volNum}: {volName}
        </div>
        <div className="absolute h-30 w-70 bg-linear-to-r from-base via-[#0F215E] to-transparent"></div>
      </div>

      <img
        src={volPic}
        alt=""
        className="h-30 w-90 object-cover  bg-center items-center"
      />
    </div>
  );
};

export default Volume;
