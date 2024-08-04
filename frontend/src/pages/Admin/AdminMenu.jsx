import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <button 
                className={`${
                    isMenuOpen ? 
                    'top-2 right-2' : 
                    'top-7 right-9'
                } bg-white p-2 fixed rounded-lg`} 
                onClick={toggleMenu}
            >
                {isMenuOpen ? (
                    <FaTimes color='black' />
                ) : (
                    <>
                        <div className="w-5 h-1 bg-black my-0.5"></div>
                        <div className="w-5 h-1 bg-black my-0.5"></div>
                        <div className="w-5 h-1 bg-black my-0.5"></div>
                    </>
                )}
            </button>
            { isMenuOpen && (
                <section className='p-4 fixed right-9 top-7 shadow-lg rounded-lg'>
                    <ul className="list-none mt-2">
                        <li>
                            <NavLink 
                                className='list-item py-2 px-3 block mb-5 hover:bg-gray-200 rounded-sm' 
                                to='/admin/dashboard' 
                                style={({ isActive }) => ({
                                    color: isActive ? 'cyan' : 'black'
                                })}
                            >
                                Admin Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className='list-item py-2 px-3 block mb-5 hover:bg-gray-200 rounded-sm' 
                                to='/admin/categorylist' 
                                style={({ isActive }) => ({
                                    color: isActive ? 'cyan' : 'black'
                                })}
                            >
                                Create Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className='list-item py-2 px-3 block mb-5 hover:bg-gray-200 rounded-sm' 
                                to='/admin/productlist' 
                                style={({ isActive }) => ({
                                    color: isActive ? 'cyan' : 'black'
                                })}
                            >
                                Create Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className='list-item py-2 px-3 block mb-5 hover:bg-gray-200 rounded-sm' 
                                to='/admin/allproductslist' 
                                style={({ isActive }) => ({
                                    color: isActive ? 'cyan' : 'black'
                                })}
                            >
                                All Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className='list-item py-2 px-3 block mb-5 hover:bg-gray-200 rounded-sm' 
                                to='/admin/userlist' 
                                style={({ isActive }) => ({
                                    color: isActive ? 'cyan' : 'black'
                                })}
                            >
                                Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className='list-item py-2 px-3 block mb-5 hover:bg-gray-200 rounded-sm' 
                                to='/admin/orderlist' 
                                style={({ isActive }) => ({
                                    color: isActive ? 'cyan' : 'black'
                                })}
                            >
                                Manage Orders
                            </NavLink>
                        </li>
                    </ul>
                </section>
            )}
        </>
    )
}

export default AdminMenu 