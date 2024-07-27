import BlurFade from "../magicui/blur-fade";

export default function SectionHeader({ title, children }) {
    return (
        <BlurFade inView className="flex relative items-center justify-start w-full border-r-8 border-primary pr-3 ">
            <h2 className="text-3xl font-bold text-right leading-[2.5rem]">
                {title}
            </h2>
            {children}
        </BlurFade>
    );
}