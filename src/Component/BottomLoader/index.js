import Loader from "react-loader-spinner";

const BottomLoader = () => {
    return (
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

export default BottomLoader