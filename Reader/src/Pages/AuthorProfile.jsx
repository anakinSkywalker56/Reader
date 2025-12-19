import BackButton from "../Components/BackButton";
import Header from "../Components/Header";
import LargePfp from "../Components/LargePfp";
import Footer from "../Components/Footer";
import SideScroller from "../Components/SideScroller";

const AuthorProfile = () => {
    return (
        <div className="flex">
            <div className="flex flex-col h-full w-screen justify-center items-center">
                <div className="h-auto w-100 mt-16 p-2 rounded-xl border-stroke/20  border overflow-y-auto bg-linear-to-b from-stroke/25 to-transparent">
                    <Header />
                    <Footer />
                    <div>
                        <BackButton />
                        <h1 className="text-white text-3xl font-bold">Author Profile</h1>
                        <div className="flex gap-5">
                            <LargePfp />
                            <div className="flex-1">
                                <h3 className="text-white text-2xl">Yuan Ye/Cuttlefish</h3>
                                <p className="text-white text-xs">Cuttlefish that Loves Diving is a prolific web novel author and the author of Lord of Mysteries. His real name is Yuan Ye. He is from Emeishan City, Sichuan Province. He graduated from College of Computer Science of Sichuan University in 2007.</p>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-white text-3xl font-bold">Novels</h1>
                    <SideScroller />
                </div>
            </div>
        </div>
    );
}

export default AuthorProfile;