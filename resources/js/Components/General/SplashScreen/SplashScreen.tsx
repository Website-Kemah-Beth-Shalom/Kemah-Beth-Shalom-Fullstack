import "./SplashScreen.scss";

function SplashScreen() {
    return (
        <div className="splash-screen flex flex-col gap-6 w-[100vw] h-[100vh] justify-center items-center">
            <svg
                className="w-[15vw] sm:w-[10vw] md:w-[5vw]"
                viewBox="0 0 134 164"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M127.5 158H14C9.58172 158 6 154.418 6 150V60.647C6 58.3304 7.00425 56.1275 8.75302 54.608L61.7314 8.57766C64.7501 5.95483 69.2419 5.96398 72.2499 8.5991L124.772 54.6098C126.506 56.1288 127.5 58.3221 127.5 60.6273V125.5"
                    stroke="#D3C6B4"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="svg-elem-1"
                ></path>
            </svg>

            <div className="text-center text-text2 text-3xl md:text-4xl font-medium">
                HOMIKU
                <br />
                LIVING
            </div>
        </div>
    );
}

export default SplashScreen;
