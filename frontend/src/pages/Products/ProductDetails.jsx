import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
    useGetProductDetailsQuery,
    useCreateReviewMutation
} from '../../redux/api/productApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore
} from 'react-icons/fa'
import moment from 'moment'
import HeartIcon from './HeartIcon'
import Ratings from './Ratings'
import ProductTabs from './ProductTabs'

const ProductDetails = () => {
    const { id: productId } = useParams()
    const navigate = useNavigate()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const {
        data: product,
        isLoading,
        refetch,
        error
    } = useGetProductDetailsQuery(productId)

    const { userInfo } = useSelector(state => state.auth)

    const [
        createReview,
        { isLoading: loadingProductReview }
    ] = useCreateReviewMutation()

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            await createReview({
                productId,
                rating,
                comment
            }).unwrap()
            refetch()
            toast.success('Review created successfully')
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

    return (
        <>
            <div className='mt-[1rem]'>
                <Link
                    to='/'
                    className='font-semibold hover:underline 
                    ml-[10rem]'
                >
                    Go Back
                </Link>
            </div>

            {isLoading
                ? (<Loader />)
                : error
                    ? (
                        <Message variant='danger'>
                            {error?.data || error.message}
                        </Message>
                    ) : (
                        <>
                            <div className="flex flex-wrap relative 
                            items-between mt-[2rem] xl:flex-row 
                            lg:flex-row md:flex-col xl:ml-[12rem] lg:ml-[0rem] 
                            md:ml-[10rem] sm:ml-[4rem]"
                            >
                                <div>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className='w-full xl:w-[30rem] 
                                lg:w-[26rem] md:w-[30rem] 
                                sm:w-[30rem] mr-[2rem] xl:ml-[0rem] lg:ml-[10rem] 
                                md:ml-[5rem] sm:ml-[4rem] xl:mb-0 lg:mb-0 
                                md:mb-[2rem] sm:mb-[2rem]'
                                    />

                                    <HeartIcon product={product} />
                                </div>

                                <div
                                    className="flex flex-col justify-between xl:w-[30rem] 
                                    lg:w-[25rem] md:w-[30rem] sm:w-[25rem]"
                                >
                                    <h2 className='xl:text-2xl lg:text-xl md:text-2xl 
                                    sm:text-3xl font-semibold'>
                                        {product.name}
                                    </h2>
                                    <p className="my-4 xl:[35rem] lg:w-[25rem] 
                                    md:w-[25rem] sm:w-[25rem]"
                                    >
                                        {product.description}
                                    </p>
                                    <p className="xl:text-5xl lg:text-2xl md:text-4xl 
                                    sm:text-4xl my-4 font-extrabold">
                                        $ {product.price}
                                    </p>
                                    <div
                                        className="flex items-center justify-between 
                                        xl:w-[20rem] lg:w-[20rem] md:w-[25rem] md:w-[25rem]"
                                    >
                                        <div className="one">
                                            <h1 className="flex items-center mb-6 
                                            xl:text-md lg:text-md md:text-lg sm:text-lg"
                                            >
                                                <FaStore className='mr-2' />
                                                Brand: {' '}
                                                {product.brand}
                                            </h1>
                                            <h1 className="flex items-center mb-6 
                                            xl:text-md lg:text-md md:text-lg sm:text-lg"
                                            >
                                                <FaClock className='mr-2' />
                                                Added: {' '}
                                                {moment(product.createdAt).fromNow()}
                                            </h1>
                                            <h1 className="flex items-center mb-6 
                                            xl:text-md lg:text-md md:text-lg sm:text-lg"
                                            >
                                                <FaStore className='mr-2' />
                                                Reviews: {' '}
                                                {product.numReviews}
                                            </h1>
                                        </div>
                                        <div className="two">
                                            <h1 className="flex items-center mb-6 
                                            xl:text-md lg:text-md md:text-lg sm:text-lg"
                                            >
                                                <FaStar className='mr-2' />
                                                Ratings: {' '}
                                                {Math.round(product.rating)}
                                            </h1>
                                            <h1 className="flex items-center mb-6 
                                            xl:text-md lg:text-md md:text-lg sm:text-lg"
                                            >
                                                <FaShoppingCart className='mr-2' />
                                                Quantity: {' '}
                                                {product.quantity}
                                            </h1>
                                            <h1 className="flex items-center mb-6 
                                            xl:text-md lg:text-md md:text-lg sm:text-lg"
                                            >
                                                <FaBox className='mr-2' />
                                                In Stock: {' '}
                                                {product.countInStock}
                                            </h1>
                                        </div>
                                    </div>

                                    <div className="flex justify-between flex-wrap">
                                        <Ratings
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                            color='yellow-500'
                                        />
                                        {product.countInStock > 0 && (
                                            <div>
                                                <select
                                                    value={qty}
                                                    onChange={e => setQty(e.target.value)}
                                                    className='p-2 w-[6rem] rounded-lg 
                                            text-black'
                                                >
                                                    {[...Array(product.countInStock).keys()]
                                                        .map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    <div className="btn-container">
                                        <button
                                            // onClick={addToCartHandler} 
                                            disabled={product.countInStock === 0}
                                            className='bg-pink-600 text-white py-2 px-4 
                                    rounded-lg mt-4 md:mt-0'
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>

                                <div
                                    className="xl:mt-[4rem] lg:mt-[2rem] md:mt-[2rem] 
                                    sm:mt-[1rem] container flex flex-wrap items-start 
                                    justify-between xl:ml-[6rem] lg:ml-[7rem] md:ml-0 
                                    sm:ml-[7rem]"
                                >
                                    <ProductTabs
                                        loadingProductReview={loadingProductReview}
                                        userInfo={userInfo}
                                        submitHandler={submitHandler}
                                        rating={rating}
                                        setRating={setRating}
                                        comment={comment}
                                        setComment={setComment}
                                        product={product}
                                    />
                                </div>
                            </div>
                        </>
                    )}
        </>
    )
}

export default ProductDetails