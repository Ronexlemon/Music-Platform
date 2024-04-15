import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
    children: ReactNode;
}
const CreateLayout: FC<Props> = ({ children }) => {
    return (
        <>
            <div className="bg-gypsum overflow-hidden flex flex-col min-h-screen ">
                <Header />
                <div className="  mx-auto   w-full">
                    {children}
                </div>
                {/* <Footer /> */}
            </div>
        </>
    );
};

export default CreateLayout;
