import {  useState } from 'react'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery()

  const [ name, setName ] = useState('')
  const [ selectedCategory, setSelectedCategory ] = useState('')
  const [ updateName, setUpdateName ] = useState('')
  const [ modalVisible, setModalVisible ] = useState('')

  const [ createCategory ] = useCreateCategoryMutation()
  const [ updateCategory ] = useUpdateCategoryMutation()
  const [ deleteCategory ] = useDeleteCategoryMutation()
  
  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
      </div>
    </div>
  )
}

export default CategoryList