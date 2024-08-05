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

    const {userInfo} = useSelector(state => state.auth)

    const [
        createReview, 
        {isLoading: loadingProductReview}
    ] = useCreateReviewMutation()

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
                        {error?.data?.message || error.message}
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

                        <div className="flex flex-col justify-between">
                            <h2 className='text-2xl font-semibold'>{product.name}</h2>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ProductDetails