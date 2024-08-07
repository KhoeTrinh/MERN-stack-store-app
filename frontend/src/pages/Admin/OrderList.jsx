import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../redux/api/orderApiSlice';
import AdminMenu from './AdminMenu';
import { AiTwotoneDashboard } from 'react-icons/ai';

const OrderList = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.error || error.error}
                </Message>
            ) : (
                <table className='container mx-auto'>
                    <AdminMenu />
                    <thead className='w-full border'>
                        <th className='text-left pl-1 text-center'>
                            ITEMS
                        </th>
                        <th className='text-left pl-1 text-center'>
                            ID
                        </th>
                        <th className='text-left pl-1 text-center'>
                            USER
                        </th>
                        <th className='text-left pl-1 text-center'>
                            DATA
                        </th>
                        <th className='text-left pl-1 text-center'>
                            TOTAL
                        </th>
                        <th className='text-left pl-1 text-center'>
                            PAID
                        </th>
                        <th className='text-left pl-1 text-center'>
                            DELIVERED
                        </th>
                        <th></th>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <tr
                                key={order._id}
                                className='border text-center'>
                                <td>
                                    <div className='flex justify-center'>
                                        <img
                                            src={
                                                order.orderItems[0]
                                                    .image
                                            }
                                            alt={order._id}
                                            className='w-[5rem] pt-4'
                                        />
                                    </div>
                                </td>

                                <td>{order._id}</td>
                                <td>
                                    {order.user
                                        ? order.user.username
                                        : 'N/A'}
                                </td>
                                <td>
                                    {order.createdAt
                                        ? order.createdAt.substring(
                                              0,
                                              10
                                          )
                                        : 'N/A'}
                                </td>
                                <td>$ {order.totalPrice}</td>

                                <td className='py-2 px-4 w-[6rem]'>
                                    {order.isPaid ? (
                                        <p
                                            className='p-1 text-center 
                                        bg-green-400 w-[6rem] rounded-full'>
                                            Completed
                                        </p>
                                    ) : (
                                        <p
                                            className='p-1 text-center 
                                        bg-red-400 w-[6rem] rounded-full'>
                                            Pending
                                        </p>
                                    )}
                                </td>

                                <td className='py-2 px-4 w-[6rem]'>
                                    {order.isDelivered ? (
                                        <p
                                            className='p-1 text-center 
                                        bg-green-400 w-[6rem] rounded-full'>
                                            Completed
                                        </p>
                                    ) : (
                                        <p
                                            className='p-1 text-center 
                                        bg-red-400 w-[6rem] rounded-full'>
                                            Pending
                                        </p>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/order/${order._id}`}>
                                        <button>More Info</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default OrderList;
