import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  return (
    <>
      <div className="h-20 w-screen bg-amber-300/0 fixed bottom-0 left-0 justify-between flex pr-10 pl-10">
        <div
          className="h-20 w-20  flex justify-center items-center flex-col"
          onClick={() => navigate(`/home/${userId}`)}
        >
          <div className="h-8 w-8 rounded-full bg-amber-50/0">
            <img src="/assets/Home icon.png" alt="" />
          </div>
          <div className="text-basefont">Home</div>
        </div>
        {/* <div className="h-20 w-20 flex justify-center items-center flex-col">
          <div className="h-8 w-8 rounded-full bg-amber-50/0">
            <img src="/assets/Search icon.png" alt="" />
          </div>
          <div className="text-basefont">Search</div>
        </div>
        <div className="h-20 w-20 flex justify-center items-center flex-col">
          <div className="h-8 w-8 rounded-full bg-amber-50/0">
            <img src="/assets/Discover Icon.png" alt="" />
          </div>
          <div className="text-basefont">Discover</div>
        </div> */}
        <div
          className="h-20 w-20 flex justify-center items-center flex-col "
          onClick={() => {
            navigate(`/library/${userId}`);
          }}
        >
          <div className="flex justify-center items-center h-8 w-20 rounded-full bg-amber-50/0 overflow-hidden">
            <img src="/assets/Library Icon.png" alt="" className="w-10 h-10" />
          </div>
          <div className="text-basefont">Library</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
