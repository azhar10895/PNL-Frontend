import React from 'react';
import {useFormik} from 'formik';

const initialValues ={
    firstname: '',
    lastname:'',
    email: '',
    phone: ''
}

const onSubmit = values =>{
    console.log('form data', values)
}

const validate = values=>{
    let errors={}
    if(!values.firstname){
        errors.firstname='Required'
    }
    if(!values.lastname){
        errors.lastname='Required'
    }
    if(!values.email){
        errors.email='Required'
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email='Invalid email'
    }
    if(!values.phone){
        errors.phone='Required'
    }
    return errors
}

function SignupForm(){

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    //console.log('FormValues:', formik.values)

    return(
        <div>
            <h1>Create Account</h1>
            <p>Already have an account?<a href="_blank"> Sign in </a></p>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='firstname'>First Name</label>
                    <input type='text' id='firstname' name='firstname' placeholder="First Name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstname}/>
                    {formik.touched.firstname && formik.errors.firstname? <div className='error'>{formik.errors.firstname}</div>:null}
                </div>
                <div className='form-control'>
                    <label htmlFor='lastname'>Last Name</label>
                    <input type='text' id='lastname' name='lastname' placeholder="Last Name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastname}/>
                    {formik.touched.lastname && formik.errors.lastname? <div className='error'>{formik.errors.lastname}</div>:null}
                </div>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' name='email' placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                    {formik.touched.email && formik.errors.email? <div className='error'>{formik.errors.email}</div>:null}
                </div>
                <div className='form-control'>
                    <label htmlFor='phone'>Phone</label>
                    <input type='text' id='phone' name='phone' placeholder="Phone Number" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
                    {formik.touched.phone && formik.errors.phone? <div className='error'>{formik.errors.phone}</div>:null}
                </div>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignupForm;