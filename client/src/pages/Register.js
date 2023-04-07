import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert} from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
// GETTING THE CONTEXT VARIABLE/COMPONENT THAT HOLDS GLOBAL STATE VARIABLES
import { useAppContext } from '../context/appContext';
// GETTING USE NAVIGATE THAT WILL REDIRECT USER TO HOME PAGE AFTER LOGIN
import { useNavigate } from 'react-router-dom';

// OBJECT HOLDING THE USER DETAILS TO BE SIGNED IN - EACH PROPERTY WILL BE LINKED-BIND
// WITH A FORM INPUT CONTAINING DATA GIVEN BY THE USER
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  // GET THE REDIRECTING VARIABLE FROM REACT ROUTER
  const navigate = useNavigate();

  // THIS STATE VALUE AND FUNCTION WILL BE USED WITH FORM FOR DATA (PROPERTY) BINDING
  const [values, setValues] = useState(initialState);

  // const globalState = useAppContext();
  // console.log(globalState);
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser} = useAppContext();

   // FUNCTION TO HANDLE CONDITIONAL RENDERING OF A LOGIN FORM AND REGISTER PAGE ON SAME PAGE
  const toggleMember = () => {
    // CHANGE THE VALUES OF THE STATE VARIABLE values USING THE setValues
    //..values - bring back & maintains old values/initialState state object variable
    setValues({...values, isMember: !values.isMember}) 
  }
  
  // THIS WILL BE TRIGGERED EACH TYPE VALUES CHANGE IN THE FORM INPUTS - PROPERTY DATA BINDING
  const handleChange = (e) => {
    // console.log(e.target);
    // DATA ATTRIBUTE BINDING - FORM INPUT TO USE STATE OBJECT - values - initial state object
    // name attribute in input element of form, value attribute in input element of form
    setValues({ ...values, [e.target.name]: e.target.value }); 
  }

  // FUNCTION TO CALL THE EITHER THE FUNCTION FOR LOGIN OR REGISTRATION
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target);
    // GET VALUES FROM THE FORM -STORED IN THE USE STATE OBJECT VARIABLE
    const { name, email, password, isMember } = values;
    // VALIDATE DATA ENTERED - IS ANY EMPTY AND NOTIFY TO USER
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    // console.log(values);

    // FUNCTIONALITY TO LOGIN THE USER AFTER SUCCESSFULLY MAKING AN ACCOUNT / DIRECT LOGIN
    const currentUser = { name, email, password }
    if(isMember) {
      console.log('Already a Member');
      loginUser(currentUser);
    }
    else {
      registerUser(currentUser);
    }
    
  };

  // REDIRECT THE USER AFTER 3 SECONDS AFTER A SUCCESSFUL REGISTRATION
  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate('/');
      },3000)   
    }
  }, [user, navigate])

  return (
    <Wrapper className="full-page">
      <form action="" className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember? 'Login' : 'Register'}</h3>
        {/* {console.log(`ShowAlert is: ${showAlert}`)} */}
        {showAlert && <Alert />}
        {/* showAlert IS A VARIABLE FROM THE useAppContext() FUNCTION ACCESSING THE CONTEXT VARIABLE/COMPONENT */}

        {/* IF USER IS NOT A MEMBER SHOW THE NAME FIELD FOR REGISTRATION PURPOSES */}
        { values.isMember === false? (
          // name field 
          <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />
          ) : ''
        }
          {/* { !values.isMember && (
          // name field 
          <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />
          )
        } */}
 
        {/* email field */}
        <FormRow type='email' name='email' value={values.email} handleChange={handleChange} />
        {/* password field */}
        <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>

        {/* BUTTON FOR APP TEST USER  */}
        <button 
          type='button' 
          className='btn btn-block btn-hipster' 
          disabled={isLoading}
          onClick={()=> {
          const currentUser = { email:"testUser@test.com", password: "123456" }
            loginUser(currentUser);
          }}
          >
          {isLoading? "Loading...": "demo app"}
        </button>

        <p>
          {values.isMember? 'Not A Member Yet?': 'Already A Member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember? 'Register': 'Login'}
          </button>
        </p>

      </form>
    </Wrapper>
  )
}
export default Register