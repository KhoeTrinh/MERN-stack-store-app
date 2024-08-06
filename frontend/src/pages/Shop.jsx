import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetFilteredProductsQuery } from '../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../redux/api/categoryApiSlice';
import {
    setCategories,
    setProducts,
    setChecked,
} from '../redux/features/shop/shopSlice';
import Loader from '../components/Loader';

const Shop = () => {
    const dispatch = useDispatch();
    const { categories, products, checked, radio } = useSelector(
        (state) => state.shop
    );

    const categoriesQuery = useFetchCategoriesQuery();
    const [priceFilter, setPriceFilter] = useSelector('');

    const filteredProductQuery = useGetFilteredProductsQuery({
        checked,
        radio,
    });

    useEffect(() => {
        if (!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data));
        }
    }, [categoriesQuery.data, dispatch]);

    useEffect(() => {
        if (!checked.length || !radio.length) {
            if (!filteredProductQuery.isLoading) {
                const filteredProducts =
                    filteredProductQuery.data.filter((product) => {
                        return (
                            product.price
                                .toString()
                                .includes(priceFilter) ||
                            product.price ===
                                parseInt(priceFilter, 10)
                        );
                    });
                dispatch(setProducts(filteredProducts));
            }
        }
    });

    const handleBrandClick = (brand) => {
        const productsByBrand = filteredProductQuery.data?.filter(
            (product) => product.brand === brand
        );
        dispatch(setProducts(productsByBrand));
    };

    const handleCheck = (value, id) => {
        const updatedChecked = value
            ? [...checked, id]
            : checked.filter((c) => c !== id);
        dispatch(setChecked(updatedChecked));
    };

    const uniBrands = [
        ...Array.form(
            new Set(
                filteredProductQuery.data
                    ?.map((product) => product.brand)
                    .filter((brand) => brand !== undefined)
            )
        ),
    ];
    const handlePriceChange = e => {
        setPriceFilter(e.target.value);
    }

    return <div>Shop</div>;
};

export default Shop;
