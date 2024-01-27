function GoDownButton({ id, backToTop }: { id: string; backToTop?: boolean }) {
    const scrollTo = () => {
        const button = document.getElementById(id); // replace with your actual button id
        if (button) {
            button.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className={`flex w-full justify-center items-center ${backToTop ? 'rotate-180' : null}`}>
            <div
                id={id}
                onClick={backToTop ? () => window.scrollTo(0, 0) : () => scrollTo() }
                className="flex justify-center items-center 
                    w-[2.8rem] h-[2.8rem] relative
                    bg-bg1 hover:bg-bg2 rounded-full cursor-pointer
                    border-2 border-deco1 animate-bounce text-text3"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className="
                    w-[1.3rem] h-[1.3rem] absolute
                    justify-center items-center inline-flex"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                    />
                </svg>
            </div>
        </div>
    );
}

export default GoDownButton;
