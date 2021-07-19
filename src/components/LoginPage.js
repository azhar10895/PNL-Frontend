import React from "react";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import '../components/LoginPage.css'

const initialValues ={
    username: '',
    password: '',

}

const onSubmit = values =>{
    console.log('form data', values)
}

const validate = values=>{
    let errors={}
    if(!values.username){
        errors.username='Required'
    }
    if(!values.password){
        errors.password='Required'
    }
    return errors
}

function LoginPage(){

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    return(
        <div className="container-7 my-container">
            <div className="middle">
                <h1 className="color-forHeadings">Log In</h1>
                <p className="color-forSmallText">
                    Already have an account?<a href=" "> Sign in </a>
                    </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' name='username' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username}/>
                    {formik.touched.username && formik.errors.username? <div className='error'>{formik.errors.username}</div>:null}
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                    {formik.touched.password && formik.errors.password? <div className='error'>{formik.errors.password}</div>:null}
                </div>

                <button type="submit" className="btn col-12 my-btn">Log In</button>
            </form>
        </div>
    )
}

export default LoginPage;