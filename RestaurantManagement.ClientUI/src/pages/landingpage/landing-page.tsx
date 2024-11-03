import BookFormOfNormal from "../../components/bookform/bookformofNormal";
import CarouselPage from "../../components/carousel/carousel";

const LandingPage = () => {
    return (
        <div>
            <div className="container">
                <CarouselPage />
            </div>
            <div className="container mt-5">
                <BookFormOfNormal />
            </div>
        </div>
    );
}

export default LandingPage;