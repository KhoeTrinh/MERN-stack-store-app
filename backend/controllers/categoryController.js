import Category from '../models/categoryModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body

        if(!name) {
            return res.json({error: "Name is required bro 🤦‍♂️"})
        }

        const existingCategory = await Category.findOne({ name })

        if(existingCategory) {
            return res.json({error: "Category already exists man ☠️"})
        }

        const category = await new Category({ name }).save()
        res.json(category)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body
        const { categoryId } = req.params

        const category = await Category.findOne({_id: categoryId})

        if(!category) {
           return res.status(404).json({error: "Category not found"})
        }

        category.name = name
        
        const updateCategory = await category.save()
        res.json(updateCategory)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId)        
        res.json(removed)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
    }
})

export { 
    createCategory, 
    updateCategory,
    deleteCategory
}