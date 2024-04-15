import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import HomeNarbar from "./landNarvbar";

interface Props {
    children: ReactNode;
}
const LandLayout: FC<Props> = ({ children }) => {
    return (
        <>
            <div className="bg-gypsum overflow-hidden flex flex-col h-screen ">
                <HomeNarbar />
                <div className="  mx-auto   w-full">
                    {children}
                </div>
                {/* <Footer /> */}
            </div>
        </>
    );
};

export default LandLayout;
