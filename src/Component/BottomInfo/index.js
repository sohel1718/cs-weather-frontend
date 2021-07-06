const BottomInfo = ({info, data, getMoreInfo}) => {
    return (
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
    )
}

export default BottomInfo