const FormRow = ({type, name, value, labelText, handleChange}) => {
  return (
    <div className='form-row'>
        <label
            htmlFor={name}
            className='form-label'>
            {labelText||name}
        </label>
        <input
            type={type}
            className='form-input'
            name={name}
            value={value}
            onChange={handleChange}
        />
    </div>
  )
}

export default FormRow
