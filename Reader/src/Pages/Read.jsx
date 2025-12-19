import Footer from "../Components/Footer"
import ReadHeader from "../Components/ReadHeader"

export default function Read() {
    return (
        <div className="flex">
            <div className="flex flex-col h-full w-screen justify-center items-center">
                <div className="h-auto w-100 mt-16 p-2 rounded-xl border-stroke/20  border overflow-y-auto bg-linear-to-b from-stroke/25 to-transparent">
                    <ReadHeader />
                    <Footer />
                </div>
            </div>
        </div>
    )
};
