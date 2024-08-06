import { useState } from 'react'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'
import {
    useGetTopProductsQuery
} from '../../redux/api/productApiSlice'
import SmallProduct from './SmallProduct'
import Loader from '../../components/Loader'


const ProductTabs = ({
    loadingProductReviews,
    userInfo,
    submitHandler,
    rating,
    setRating,
    comment,
    setComment,
    product,
}) => {
    const { data, isLoading } = useGetTopProductsQuery()

    const [activeTab, setActiveTab] = useState(1)

    if (isLoading) {
        return <Loader />
    }

    const handleTabClick = (tabNum) => {
        setActiveTab(tabNum)
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <section className='xl:mr-[5rem] lg:mr-[0rem]'>
                <div
                    className={`flex-1 p-4 cursor-pointer 
                    text-lg w-[12rem] ${activeTab === 1
                            ? 'font-bold'
                            : ''
                        }`}
                    onClick={() => handleTabClick(1)}
                >
                    Write Your Review
                </div>
                <div
                    className={`flex-1 p-4 cursor-pointer 
                    text-lg w-[12rem] ${activeTab === 2
                            ? 'font-bold'
                            : ''
                        }`}
                    onClick={() => handleTabClick(2)}
                >
                    All Reviews
                </div>
                <div
                    className={`flex-1 p-4 cursor-pointer 
                    text-lg w-[12rem] ${activeTab === 3
                            ? 'font-bold'
                            : ''
                        }`}
                    onClick={() => handleTabClick(3)}
                >
                    Related Products
                </div>
            </section>

            <section>
                {activeTab === 1 && (
                    <div className="mt-4">
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <div className="my-2">
                                    <label
                                        htmlFor="rating"
                                        className='block 
                                        text-xl mb-2'
                                    >
                                        Ratings
                                    </label>
                                    <select
                                        id="rating"
                                        required
                                        value={rating}
                                        onChange={
                                            e => setRating(e.target.value)
                                        }
                                        className='p-2 border rounded-lg 
                                        xl:w-[40rem] lg:w-[35rem] 
                                        md:w-[24rem] sm:w-[25rem] text-black'
                                    >
                                        <option value="">
                                            Select a rating
                                        </option>
                                        <option value="1">
                                            Inferior
                                        </option>
                                        <option value="2">
                                            Decent
                                        </option>
                                        <option value="3">
                                            Great
                                        </option>
                                        <option value="4">
                                            Excellent
                                        </option>
                                        <option value="5">
                                            Exceptional
                                        </option>
                                    </select>
                                </div>

                                <div className="my-2">
                                    <label
                                        htmlFor="comment"
                                        className='block text-xl mb-2'
                                    >
                                        Comment
                                    </label>
                                    <textarea
                                        id="comment"
                                        rows='3'
                                        required
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        className='p-2 border rounded-lg xl:w-[40rem] 
                                        lg:w-[35rem] md:w-[24rem] sm:w-[25rem]
                                        text-black'
                                    />
                                </div>
                                <button
                                    type='submit'
                                    disabled={loadingProductReviews}
                                    className='bg-pink-600 text-white 
                                    py-2 px-4 rounded-lg'
                                >
                                    Submit
                                </button>
                            </form>
                        ) : (
                            <p>Please
                                <Link to='/login'>
                                    sign in
                                </Link>
                                to write a reviews
                            </p>
                        )}
                    </div>
                )}
            </section>
            <section>
                {activeTab === 2 && (
                    <>
                        <div>
                            {
                                product.reviews.length === 0
                                && <p>No Reviews</p>
                            }
                        </div>
                        <div>
                            {product.reviews.map((review) => (
                                <div
                                    key={review._id}
                                    className='bg-gray-100 p-4 rounded-lg 
                                    xl:ml-[2rem] lg:ml-[6rem] md:ml-[3rem] 
                                    sm:ml-[0rem] xl:w-[35rem] lg:w-[35rem] 
                                    md:w-[25rem] sm:w-[24rem] mb-5'
                                >
                                    <div className="flex justify-between">
                                        <strong>
                                            {review.name}
                                        </strong>
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                    </div>

                                    <p className="my-4">{review.comment}</p>
                                    <Ratings value={review.rating} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>
            <section>
                {activeTab === 3 && (
                    <section className='flex flex-wrap'>
                        {!data ? (
                            <Loader />
                        ) : (
                            data.map((product) => (
                                <div key={product._id}>
                                    <SmallProduct product={product} />
                                </div>
                            ))
                        )}
                    </section>
                )}
            </section>
        </div>
    )
}

export default ProductTabs