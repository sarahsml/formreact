import React, { useState,useEffect } from 'react';

function APP(){
    //states
    const initialvalues = {username:'',email:'',password:''};
    const [formValues,setFormValues] = useState(initialvalues)
    const [formErrors,setFormErrors] = useState({});
    const [isSubmit,setIssubmit] = useState(false)

    //event change
    const handleChange = (e)=>{
        console.log(e.target);
        const { name , value} = e.target;
        setFormValues({...formValues,[name]:value});
        console.log(formValues);
    };
    //
    const handelSubmit = (e) =>{
        //for update 
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIssubmit(true);
    };
    //for Errors
    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues)
        }
    },[formErrors])

    //validate
    const validate = (values)=>{

        const errors = {}

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        if(!values.username){
            errors.username = 'username is required!'
        }
        if(!values.email){
            errors.email = 'email is required!'
        }else if(regex.test(values.email)){
            errors.email = 'this is not a valid email format!'  
        }
        if(!values.password){
            errors.password = 'password is required!'
        }else if(values.password < 4 ){
            errors.email = 'password most be more than 4 characters!'  
        }else if(values.password > 20){
            errors.email = 'password cannot exceed more than 20 characters!'  
        }
        return errors;
    };
    //html
    return(
    <div className='container'>
      {Object.keys(formErrors).length === 0 && isSubmit ? (<div className='ui message sucess'>Signed In Successfully</div>) : (
       <pre>|{JSON.stringify(formValues,undefined,2)}</pre>)}
        <form onSubmit={handelSubmit}>
            <h1>Login form</h1>
            <div className='ui divider'></div>
            <div className='ui form'>
                <div className='field'>
                   <label>Username</label>
                   <input type='text' name='username' placeholder='username' 
                   value={formValues.username} 
                   //for update
                   onChange={handleChange}
                   />
                </div>
                <p>{ formErrors.username}</p>
                <div className='field'>
                    <label>Email</label>
                    <input type='email' name='email' placeholder='email' 
                    value={formValues.email}
                    onChange={handleChange}
                    />
                </div>
                <p>{ formErrors.email}</p>
                <div className='field'>
                    <label>password</label>
                    <input type='password' name='password' placeholder='password' 
                    value={formValues.password}
                    onChange={handleChange}
                    />
                </div>
                <p>{ formErrors.password}</p>
                <button className="fluid ui button blue">Submit</button>
            </div>
        </form>
    </div>);
};

export default APP