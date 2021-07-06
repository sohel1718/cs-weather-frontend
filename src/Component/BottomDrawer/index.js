import moment from "moment";
import BoxLoader from "../BoxLoader";
import close from "../../images/close.png";

const BottomDrawer = ({ data, setToggle, setToggleData, toggleData, dailyData, dailyLoading, status}) => {
    return (
        <div className="container__bottomDrawer">
                    <div className="container__bottomDrawer__header">
                        <div className="container__bottomDrawer__header__location">
                            <span id="date">{moment.unix(data.weatherByCoords.dt).format("DD, MMM YYYY")}</span>
                            <div id="name">
                                <img src="./location-pin.png" alt="" />
                                <span><b>{data.weatherByCoords.name}</b>, {data.weatherByCoords.sys.country}</span>
                            </div>
                        </div>
                        <div className="container__bottomDrawer__header__cancel">
                            <img src={close} onClick={() => setToggle(false)} alt="" />
                        </div>
                    </div>
                    <div className="container__bottomDrawer__curWeather">
                        <img src={`http://openweathermap.org/img/wn/${data.weatherByCoords.weather[0].icon}@2x.png`} alt="" />
                        <div className="container__bottomDrawer__curWeather__detail">
                            <span id="dec">{data.weatherByCoords.weather[0].description}</span>
                            <span id="temp">{Math.floor(data.weatherByCoords.main.temp)}°</span>
                        </div>
                        <div className="container__bottomDrawer__curWeather__switch">
                            <span onClick={() => setToggleData(true)} id={`${toggleData ? "active" : "close"}`}>Daily</span>
                            <span onClick={() => setToggleData(false)} id={`${!toggleData ? "active" : "close"}`}>Hourly</span>
                        </div>
                    </div>
                    <div className="container__bottomDrawer__dailyWeather">
                        {
                          (!dailyLoading && toggleData) ? dailyData?.dailyWeatherData?.daily?.map(data => {
                                return (
                                    <div className="container__bottomDrawer__dailyWeather__wrapper" >
                                       
                                        <div id="pop">
                                                <img src="./water-drop.png" alt="" />
                                                <span>{Math.floor(data.pop*100)}%</span>
                                            </div>
                                        <div className="container__bottomDrawer__dailyWeather__wrapper__box">
                                            <div id="time">{moment.unix(data.dt).format("h:mm a")}</div>
                                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                                            <span id="temp">{Math.floor(data.temp.max)}°</span>
                                        </div>
                                        <div className="container__bottomDrawer__dailyWeather__wrapper__date">{moment.unix(data.dt).format("ddd, DD MMM")}</div>
                                    </div>
                                )
                            }) : 
                            dailyData?.dailyWeatherData?.hourly?.map(data => {
                                return (
                                    <div className="container__bottomDrawer__dailyWeather__wrapper" >
                                        <div id="pop">
                                                <img src="./water-drop.png" alt="" />
                                                <span>{Math.floor(data.pop*100)}%</span>
                                        </div>
                                        <div className="container__bottomDrawer__dailyWeather__wrapper__box">
                                            <div id="time">{moment.unix(data.dt).format("h:mm a")}</div>
                                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                                            <span id="temp">{Math.floor(data.temp)}°</span>
                                           
                                        </div>
                                        <div className="container__bottomDrawer__dailyWeather__wrapper__date">{moment.unix(data.dt).format("ddd, DD MMM")}</div>
                                    </div>
                                )
                            })
                        }
                        {
                            status === 1 && (
                               <BoxLoader />
                            )
                        }
                    </div>
                </div>
    )
}

export default BottomDrawer