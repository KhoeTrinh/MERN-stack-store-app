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
                    items-between mt-[2rem] ml-[10rem]"
                            >
                                <div>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className='w-full xl:w-[40rem] 
                                lg:w-[30rem] md:w-[20rem] 
                                sm:w-[10rem] mr-[2rem]'
                                    />

                                    <HeartIcon product={product} />
                                </div>

                                <div
                                    className="flex flex-col justify-between"
                                >
                                    <h2 className='text-2xl font-semibold'>
                                        {product.name}
                                    </h2>
                                    <p className="my-4 xl:[35rem] lg:w-[35rem] 
                            md:w-[30rem]"
                                    >
                                        {product.description}
                                    </p>
                                    <p className="text-5xl my-4 font-extrabold">
                                        $ {product.price}
                                    </p>
                                    <div
                                        className="flex items-center justify-between 
                                w-[20rem]"
                                    >
                                        <div className="one">
                                            <h1 className="flex items-center mb-6">
                                                <FaStore className='mr-2' />
                                                Brand: {' '}
                                                {product.brand}
                                            </h1>
                                            <h1 className="flex items-center mb-6">
                                                <FaClock className='mr-2' />
                                                Added: {' '}
                                                {moment(product.createdAt).fromNow()}
                                            </h1>
                                            <h1 className="flex items-center mb-6">
                                                <FaStore className='mr-2' />
                                                Reviews: {' '}
                                                {product.numReviews}
                                            </h1>
                                        </div>
                                        <div className="two">
                                            <h1 className="flex items-center mb-6">
                                                <FaStar className='mr-2' />
                                                Ratings: {' '}
                                                {Math.round(product.rating)}
                                            </h1>
                                            <h1 className="flex items-center mb-6">
                                                <FaShoppingCart className='mr-2' />
                                                Quantity: {' '}
                                                {product.quantity}
                                            </h1>
                                            <h1 className="flex items-center mb-6">
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
                                    className="mt-[5rem] container flex flex-wrap 
                            items-start justify-between ml-[10rem]"
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