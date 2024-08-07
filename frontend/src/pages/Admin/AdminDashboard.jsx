import Chart from 'react-apexcharts';
import { useGetUsersQuery } from '../../redux/api/usersApiSlice';
import {
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery,
} from '../../redux/api/orderApiSlice';
import { useState, useEffect } from 'react';
import AdminMenu from './AdminMenu';
import OrderList from './OrderList';

const AdminDashboard = () => {
    const { data: sales, isLoading } = useGetTotalSalesQuery();
    const { data: customers, isLoading: loading } =
        useGetUsersQuery();
    const { data: orders, isLoading: loadingTwo } =
        useGetTotalOrdersQuery();
    const { data: salesDetails } = useGetTotalSalesByDateQuery();

    const [state, setState] = useState({
        options: {
            chart: {
                type: 'line',
            },
            tooltip: {
                theme: 'black',
            },
            colors: ['#00E396'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth',
            },
            title: {
                text: 'Sales Trend',
                align: 'left',
            },
            grid: {
                borderColor: '#CCC',
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Date',
                },
            },
            yaxis: {
                title: {
                    text: 'Sales',
                },
                min: 0,
            },
        },
    });

    return <div>adminadddddddddd</div>;
};

export default AdminDashboard;
