import { useState } from 'react';
import Map from "../Component/Map";
import close from "../images/close.png";
import info from "../images/info.png";
import Loader from "react-loader-spinner";
import moment from 'moment';
import { useLazyQuery } from '@apollo/client';
import { GET_CURRENT_WEATHER, GET_DAILY_WEATHER } from '../Query/graphql'
import "./weatherStyle.scss";

const Weather = () => {
    const [ getWeatherData, { loading, data, networkStatus }] = useLazyQuery(GET_CURRENT_WEATHER);
    const [ getDailyWeather, { loading: dailyLoading, data: dailyData, networkStatus: status }] = useLazyQuery(GET_DAILY_WEATHER); 
    const [latLang, setLatLng] = useState({ lat: 21.184372144052503, lng: 72.80320476074212 });
    const [toggleData, setToggleData] = useState(true);
    const [toggle, setToggle] = useState(false);
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 21.2695,
        longitude: 72.9577,
        zoom: 9,
    });

    const handleClick = (e) => {
        setLatLng({lat: e.lngLat[1],lng: e.lngLat[0]});
        getWeatherData({
            variables: { lat: e.lngLat[1], lon: e.lngLat[0] }
        });
    }

    const getMoreInfo = async() => {
        getDailyWeather({
            variables: { lat: latLang.lat, lon: latLang.lng }
        });
        setToggle(true);        
    }

    return (
        <div className="container">
            <div className="container__map-wrapper">
                <Map 
                    handleClick={handleClick}
                    viewport={viewport}
                    setViewport={setViewport}
                    latLang={latLang}
                />
            </div>
            { (!loading && data) &&
                <div className="container__bottom">
                <div className="container__bottom__info">
                    <img src={info} onClick={() => getMoreInfo()} alt="" />
                </div>
                <div className="container__bottom__content">
                    <div className="container__bottom__content__temp">
                        {Math.floor(data.weatherByCoords.main.temp)}°C
                    </div>
                    <div className="container__bottom__content__image">
                        <img src={`http://openweathermap.org/img/wn/${data.weatherByCoords.weather[0].icon}@2x.png`} alt="" />
                    </div>
                    <div className="container__bottom__content__additional">
                        <span>Feels like <b>+{Math.floor(data.weatherByCoords.main.feelsLike)}</b></span>
                        <span>{data.weatherByCoords.weather[0].description}</span>
                    </div>
                </div>
                </div>
            }
            {
                networkStatus === 1 && (
                    <div className="container__bottom">
                        <div className="container__bottom__content">
                            <div className="container__bottom__content__loader">
                                <Loader
                                    type="Circles"
                                    color="#ec6e4c"
                                    height={50}
                                    width={50}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            {toggle &&
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
                    </div>
                </div>
            }
        </div>
    )
}

export default Weather