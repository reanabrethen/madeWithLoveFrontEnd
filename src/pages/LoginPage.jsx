import { Component } from 'react'
// import '../Login/Login.css'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import {toast} from 'react-toastify'
import { NavLink } from 'react-router-dom'
import Layout from '../components/Layout'


export class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    handleOnChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleOnSubmit = async (event)=>{
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/user/login', {
                email: this.state.email,
                password: this.state.password
            })
            const decodedObj = jwtDecode(response.data.payload)
            toast.success(`Hello ${decodedObj.username}`)
            window.localStorage.setItem('jwt', response.data.payload)
            this.props.handleUserLogin(decodedObj)
        } catch (error) {
            // console.log(error)
            toast.error(error.response.data.message)
        }
    }
 
  render() {
    return (
        <Layout>
      <div className="container">
        <div className="form-text">Login</div>
        <div className="form-div">
            <form className='form' onSubmit={this.handleOnSubmit}>
                <div className="form-group-block">
                    <div className="block-container">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id='email'
                            placeholder='Email'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleOnChange}  //onChange = attribute
                        />
                    </div>
                </div>
                <div className="form-group-block">
                    <div className="block-container">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="text"
                            id="password"
                            name="password"
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.handleOnChange}
                            />
                    </div>
                </div>
                <div className="button-container">
                    <button type="submit">Submit</button>
                </div>
                <div className='login-direct'>
                    <p>Don't have an account? Sign-up <NavLink to="/sign-up">here</NavLink></p>
                </div>
            </form>
        </div>
      </div>
      </Layout>
    )
  }
}

export default Login