// FormRow COMPONENT CREATES A ROW (NAME AND CORRESPONDING INPUT FIELD) OF A FORM, WHENEVER
// USED WITH ITS CORRESPONDING PROPS NEEDED TO CREATE THE FORM ROW

const FormRow = ({ type, name, value, handleChange, labelText}) => {
  return (
    <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
          {/* { labelText? labelText: name} */}
        </label>

        <input
            type={type}
            value={value}
            name={name}
            onChange={handleChange} 
            // onChange with state variables(values) in a form create property data binding
            className='form-input'/>
    </div>
  )
}
export default FormRow