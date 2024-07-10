import { Component } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {isAlpha, isAlphanumeric, isEmail, isStrongPassword} from 'validator'
import { NavLink } from 'react-router-dom'
import Layout from '../components/Layout'
// import './SignUp.css'


export class SignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        firstNameError: "", //states that hold on to errors & can display if neccessary
        lastNameError: "",
        usernameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        submitIsDisabled: true
    }

    componentDidUpdate(prevProps, prevState){ //anytime state changes, first 'if' triggers 
        const { firstName, 
                lastName, 
                email, 
                username, 
                password, 
                confirmPassword,
                firstNameError, 
                lastNameError, 
                emailError, 
                usernameError, 
                passwordError, 
                confirmPasswordError} = this.state //avoids having to use this.state for all of them

        if(prevState.submitIsDisabled === true){ //if button is disabled
            if( firstName.length > 0 && //check if all boxes have content
                lastName.length > 0 && 
                email.length > 0 && 
                username.length > 0 && 
                password.length > 0 && 
                confirmPassword.length > 0 &&
                !lastNameError && //if nothing in error, equals to true
                !firstNameError &&
                !usernameError &&
                !emailError &&
                !passwordError &&
                !confirmPasswordError
                ){
                    this.setState({submitIsDisabled: false}) 
                }//double check that previous state has actually changed to avoid infinite loop
        }else{
            if( !firstName || //check if user has deleted all content from one of the boxes
                !lastName || //added in ! to avoid infinite loop as it was bouncing back and forth from truth & false
                !email || 
                !username || 
                !password || 
                !confirmPassword){
                    this.setState({submitIsDisabled: true})
                }   
        }
    }

    handleOnSubmit = async (event) =>{
        event.preventDefault()
        try {
            const {
                firstName, lastName, email, username, password
            } = this.state
            const user = await axios.post('http://localhost:3000/user/sign-up', {
                firstName, lastName, email, username, password
            })
            console.log(user)
            if(user){
              toast.success("User created.")
            }
            this.setState({ //once user is confirmed, setState to clear out text boxes
                firstName: "",
                lastName: "",
                email: "",
                username: "",
                password: "",
                confirmPassword: ""
            })
        } catch (error) {
            toast.error(error.response.data.message)
           
        }
    }

    handleOnChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        }, ()=>{
            // console.log(this.state.firstName) had to put the switch statement in a callback since setState takes a bit longer to run --> avoids bug
            switch (event.target.name){
                case "firstName": return this.handleFirstAndLastName(event)
                case "lastName": return this.handleFirstAndLastName(event)
                case "username": return this.handleUsername(event)
                case "email": return this.handleEmail(event)
                case "password": return this.handlePassword(event)
                case "confirmPassword": return this.handleConfirmPassword(event)
            }
        })
        // pops up error message if characters put it then deleted ()=>{
        //         if(this.state[event.target.name].length === 0){ //if str is empty, runs an error
        //             this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        //         }else{
        //             this.setState({[`${event.target.name}Error`]: ""})
        //         }
        //     }) // this.setState(state, callback) **async in nature
    }

    handleFirstAndLastName = (event) =>{
        if(this.state[event.target.name].length > 0){
            if(isAlpha(this.state[event.target.name])){
                this.setState({
                    [`${event.target.name}Error`]: ''
                })
            }else{
                this.setState({
                    [`${event.target.name}Error`]: `${event.target.placeholder} can only be alphabetical`
                })
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        }
    }

    // handleEmail => isEmail
    handleEmail = (event)=>{
        if(this.state[event.target.name].length > 0){ //if greater than 0
            if(isEmail(this.state[event.target.name])){ //check if it is in email form
                this.setState({
                    [`${event.target.name}Error`]: '' //if only alphanumeric is present, reset email input
                })
            }else{ //if special characters present, give error message
                this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} must be a valid email`})
            }
        }else{ //if input is blank
            this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        }
    }

    // handleUsername => isAlphanumeric
    handleUsername = (event) =>{
        if(this.state[event.target.name].length > 0){ //similar notes to handleEmail
            if(isAlphanumeric(this.state[event.target.name])){ //check is characters are only Alphanumeric
                this.setState({
                    [`${event.target.name}Error`]: ''
                })
            }else{
                this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} can only contain alphnumeric characters`})
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        }
    }


    // handlePassword => isStrongPassword
    handlePassword = (event) =>{
        if(this.state[event.target.name].length > 0){
            if(isStrongPassword(this.state[event.target.name])){
                this.setState({
                    [`${event.target.name}Error`]: ""
                })
            }else{
                this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} must contain 8 characters with at least 1 capital, 1 lowercase, 1 special character & 1 number`})
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        }
    }

    // handleConfirmPassword => check if equal to password
    handleConfirmPassword = (event) =>{
        if(this.state[event.target.name].length > 0){
            if(this.state.password === this.state.confirmPassword){
                this.setState({
                    [`${event.target.name}Error`]: ""
                })
            }else{
                this.setState({
                    [`${event.target.name}Error`]: 'Passwords must match'
                })
            }
        }else{
            this.setState({[`${event.target.name}Error`]: 'Please confirm password'})
        }
    }    


    render() {
    return (
        <Layout>
      <div className='container'>
        <div className="form-text">Sign Up</div>
        <div className="form-div">
            <form className="form" onSubmit={this.handleOnSubmit}>
                <div className="form-group-inline">
                    <div className="inline-container">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            type="text"
                            id="firstName"
                            placeholder='First Name'
                            name="firstName" 
                            value={this.state.firstName}
                            onChange={this.handleOnChange}
                        />
                        <div className="errorMessage">
                            {this.state.firstNameError}
                        </div>
                    </div>
                
                <div className="inline-container">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text"
                        id="lastName"
                        placeholder='Last Name'
                        name="lastName" 
                        value={this.state.lastName}
                        onChange={this.handleOnChange}
                        />
                          <div className="errorMessage">
                            {this.state.lastNameError}
                        </div>
                    </div>
                </div>
                <div className="form-group-block">
                    <div className="block-container">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            id="email"
                            value={this.state.email}
                            name="email"
                            placeholder='Email'
                            onChange={this.handleOnChange}
                             />
                          <div className="errorMessage">
                            {this.state.emailError}
                        </div>
                    </div>
                </div>
                <div className="form-group-block">
                    <div className="block-container">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text"
                            id="username"
                            value={this.state.username}
                            name="username"
                            placeholder='Username'
                            onChange={this.handleOnChange}
                             />
                        <div className="errorMessage">
                            {this.state.usernameError}
                        </div>
                    </div>
                </div>
                <div className="form-group-block">
                    <div className="block-container">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="text"
                            id="password"
                            value={this.state.password}
                            name="password"
                            placeholder='Password'
                            onChange={this.handleOnChange}
                             />
                          <div className="errorMessage">
                            {this.state.passwordError}
                        </div>
                    </div>
                </div>
                <div className="form-group-block">
                    <div className="block-container">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input 
                            type="text"
                            id="confirmPassword"
                            value={this.state.confirmPassword}
                            name="confirmPassword"
                            placeholder='Confirm Password'
                            onChange={this.handleOnChange}
                             />
                        <div className="errorMessage">
                            {this.state.confirmPasswordError}
                        </div>
                    </div>
                    <div className="button-container">
                        {/* submit button isDisabled = true with the text below */}
                        <button disabled={this.state.submitIsDisabled} type="submit">Submit</button> 
                    </div>
                </div>
            </form>
        </div>
        <div className='direct-login'>
            <p>Already have an account? <br/><NavLink to="/login">Login here!</NavLink></p>
        </div>
      </div>
      </Layout>
    )
  }
}

export default SignUp