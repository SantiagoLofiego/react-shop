import React, {useEffect, useState} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import bannerList from '../helpers/bannerList';

const MainCarousel = () => {

    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(window.innerWidth);
        }


        window.addEventListener('resize', handleWindowResize);
        
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    return (
        <Carousel className='m-2 shadow-sm p-3 mb-5 bg-body rounded' style={windowSize > 750 ? {height:"400px"} : {height:"255px"}}>
            {bannerList.map((pic) =>
            <Carousel.Item key={pic.id} className='h-75'>
                    <img
                    height={windowSize > 750 ? "345px" : "200px"}
                    className="mw-100"
                    src={pic.src}
                    alt=""
                />
            </Carousel.Item>)}
        </Carousel>
    )
}

export {MainCarousel}
