import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

// controllers
import {
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProduct,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts,
} from '../controllers/productController.js';
import {
    authenticate,
    authorizeAdmin,
} from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';

router
    .route('/')
    .get(fetchProduct)
    .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route('/allproducts').get(fetchAllProducts);

router
    .route('/:id/reviews')
    .post(authenticate, checkId, addProductReview);

router.get('/top', fetchTopProducts);
router.get('/new', fetchNewProducts);

router
    .route('/:id')
    .get(fetchProductById)
    .put(authenticate, authorizeAdmin, formidable(), updateProduct)
    .delete(
        authenticate,
        authorizeAdmin,
        formidable(),
        deleteProduct
    );

router.route('/filtered-products').post(filterProducts);

export default router;
