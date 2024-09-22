import { ViewOptions } from "./ViewOptions";
const Header : React.FC = () => {
    return (
        <div className=" bg-transparent header w-full flex ">

                <div className="welcome-message w-[85%] h-full flex flex-col justify-center  gap-1">
                    <div className="title text-3xl font-semibold text-white">Welcome back!</div>
                    <div className="message text-white text-sm text-muted-foreground">Here&apos;s a list of your tasks for this month!</div>
                </div>
                <div className="profile w-[15%] h-full flex justify-center items-center">
                    <ViewOptions />
                </div>
            </div>
    )
}
export default Header;