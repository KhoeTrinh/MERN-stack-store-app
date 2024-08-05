import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from 'moment'
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore
} from 'react-icons/fa'
import { QueryStatus } from "@reduxjs/toolkit/query"

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery()

    const settings = {
        dots: false,
        infinity: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    return (
        <div className="mb-4 xl:block lg:block md:block">
            {isLoading ? null : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.message}
                    </Message>
            ) : <Slider 
                    {...settings} 
                    className="xl:w-[40rem] lg:w-[40rem] md:w-[45rem] 
                    sm:w-[30rem] sm:block"
                >
                    {
                        products.map(({
                            image, 
                            _id, 
                            name, 
                            description, 
                            price, 
                            quantity, 
                            brand, 
                            createdAt, 
                            numReviews, 
                            rating, 
                            countInStock
                        }) => (
                            <div key={_id}>
                                <img 
                                    src={image} 
                                    alt={name} 
                                    className="w-full rounded-lg object-cover 
                                    h-[30rem]" 
                                />

                                <div className="flex justify-between w-[17rem]">
                                    <div className="one">
                                        <h1 className="font-bold">{name}</h1>
                                        <p className="font-semibold">💵 $ {price}</p> <br /> <br />
                                        <p className="w-[17rem]">👉 {description.substring(0, 170)}...</p>
                                    </div>
                                    <div className="flex justify-between w-[20rem]">
                                        <div className="one">
                                            <h1 className="flex items-center mb-6 w-[10rem]">
                                                <FaStore className="mr-2" /> Brand: {brand}
                                            </h1>
                                            <h1 className="flex items-center mb-6 w-[15rem]">
                                                <FaClock className="mr-2" /> Added: {''}
                                                    {moment(createdAt).fromNow()}
                                            </h1>
                                            <h1 className="flex items-center mb-6 w-[10rem]">
                                                <FaStar className="mr-2" /> Reviews: {numReviews}
                                            </h1>
                                        </div>
                                        <div className="two">
                                            <h1 className="flex items-center mb-6 w-[10rem]">
                                                <FaStar className="mr-2" /> Ratings: {' '} 
                                                    {Math.round(rating)}
                                            </h1>
                                            <h1 className="flex items-center mb-6 w-[10rem]">
                                                <FaShoppingCart className="mr-2" /> Quantity: {' '} 
                                                    {quantity}
                                            </h1>
                                            <h1 className="flex items-center mb-6 w-[10rem]">
                                                <FaBox className="mr-2" /> In Stock: {' '} 
                                                    {countInStock}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            }
        </div>
    )
}

export default ProductCarousel