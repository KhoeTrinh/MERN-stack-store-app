const CategoryForm = ({ 
    value, 
    setValue, 
    handlerSubmit, 
    button = 'Submit', 
    handleDelete 
}) => {
  return (
    <div className="p-3">
        <form onSubmit={handlerSubmit} className="space-y-3">
            <input 
                type="text" 
                className="py-3 px-4 border rouded-lg w-full" 
                placeholder="Write your category name" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
            />
        </form>
    </div>
  )
}

export default CategoryForm