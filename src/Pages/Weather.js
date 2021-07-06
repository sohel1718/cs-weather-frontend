import { useState } from 'react';
import Map from "../Component/Map";
import info from "../images/info.png";
import BottomInfo from "../Component/BottomInfo";
import BottomLoader from "../Component/BottomLoader";
import BottomDrawer from '../Component/BottomDrawer';
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
                <BottomInfo info={info} getMoreInfo={getMoreInfo} data={data} />
            }
            {
                networkStatus === 1 && (
                    <BottomLoader />
                )
            }
            {toggle &&
               <BottomDrawer 
                    data={data}
                    setToggleData={setToggleData}
                    setToggle={setToggle}
                    toggleData={toggleData}
                    dailyData={dailyData}
                    dailyLoading={dailyLoading}
                    status={status}
               /> 
            }
        </div>
    )
}

export default Weather