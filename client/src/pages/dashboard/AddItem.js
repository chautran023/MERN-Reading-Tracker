import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
const AddItem = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    isEditing,
    itemName,
    author, 
    seller,
    price,
    genres,
    status,
    purpose, 
    genresOptions,  
    statusOptions,
    purposeOptions,
    handleChange,
    clearValues,
    createItem,
    editItem
  } = useAppContext()

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({name,value})
    }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!itemName || !author || !seller || !price) {
      displayAlert()
      return
    }
    if(isEditing) {
      editItem()
      return
    }
    createItem()
  }
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'sửa' : 'thêm sách'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
            {/* itemName input */}
            <FormRow 
              type='text'
              name='itemName'
              value={itemName}
              labelText='tên sách' 
              handleChange={handleInput}
            /> 
            {/* author input */}
            <FormRow 
              type='text'
              name='author'
              value={author}
              labelText='tác giả/dịch giả' 
              handleChange={handleInput}
            /> 
            {/* seller input */}
            <FormRow 
              type='text'
              name='seller'
              value={seller}
              labelText='nhà bán/kênh mua hàng' 
              handleChange={handleInput}
            /> 
             {/* price input */}
             <FormRow 
              type='number'
              name='price'
              value={price}
              labelText='giá' 
              handleChange={handleInput}
            />
            {/* select genres, status, purpose */}
            <FormRowSelect 
              name='genres'
              value={genres}
              labelText='thể loại' 
              handleChange={handleInput}
              list={genresOptions}
            /> 
            {/* select genres, status, purpose */}
            <FormRowSelect 
              name='status'
              value={status}
              labelText='status' 
              handleChange={handleInput}
              list={statusOptions}
            /> 
            {/* select genres, status, purpose */}
            <FormRowSelect 
              name='purpose'
              value={purpose}
              labelText='Mục đích' 
              handleChange={handleInput}
              list={purposeOptions}
            /> 
            {/* btn container */}
            <div className="btn-container">
              <button 
                type='submit'
                className="btn btn-block submit-btn"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                gửi
              </button>
              <button 
                type='submit'
                className="btn btn-block clear-btn"
                onClick={(e) => {
                  e.preventDefault()
                  clearValues()
                }}
              >
                hoàn tác
              </button>
            </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddItem
