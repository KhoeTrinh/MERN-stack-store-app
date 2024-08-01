import Category from '../models/categoryModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

export { createCategory }