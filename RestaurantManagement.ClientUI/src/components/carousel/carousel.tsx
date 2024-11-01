import { Carousel } from "antd";


const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const CarouselPage: React.FC = () => {
    return (
        <>

            <Carousel arrows dotPosition="left" infinite={false}>
                <div>
                    <h3 style={contentStyle}>
                        1
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
        </>
    )
}

export default CarouselPage;