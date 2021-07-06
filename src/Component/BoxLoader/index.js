import Loader from "react-loader-spinner";

const BoxLoader = () => {
    return (
        <div className="container__bottomDrawer__dailyWeather__wrapper" >
            <div className="container__bottomDrawer__dailyWeather__wrapper__box">
                <Loader
                    type="Circles"
                    color="#ec6e4c"
                    height={50}
                    width={50}
                />
            </div>
        </div>        
    )
}

export default BoxLoader