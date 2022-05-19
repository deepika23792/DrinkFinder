import { React } from 'react';
import { Carousel } from "react-bootstrap";

const CarouselImg = ({ drinksImages }) => {
    return (
        <>
            <Carousel>
                {drinksImages.length != 0 && drinksImages.map((item, i) => {
                    return (
                        <Carousel.Item style={{ 'height': "300px" }} key={i}>
                            <img
                                className="d-block w-100 h-100"
                                src={item.img}
                                alt="Pics"
                            />
                        </Carousel.Item>
                    )
                })

                }
            </Carousel>
        </>
    )

}

export default CarouselImg