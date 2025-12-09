

interface Title {
    title: string;
    description?: string;
    success: boolean;
}

const CustomTitle: React.FC<Title> = ({ title, description, success }) => {
    return (
        <div className="text-right mb-7 select-none">
            <h2 className="text-(--main-color) dark:text-[#4ade80] mb-1 font-semibold text-lg">{title}</h2>
            <p className={`text-[21px] text-gray-700 dark:text-gray-200 ${success ? "lg:w-[460px] ml-auto" : ""}`}>{description}</p>
        </div>
    )
};
export default CustomTitle;
