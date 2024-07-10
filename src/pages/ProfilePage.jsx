import { useState, useEffect } from 'react'
import Axios from '../utils/Axios'

function Profile(props) {
  

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

    
    useEffect(()=>{
      try {
        if(props.user){
          async function findUser(){
            const foundUser = await Axios.get(`user/get-user-by-id/${props.user.id}`)  
            console.log(foundUser)
            setFirstName(foundUser.data.payload.firstName)
            setLastName(foundUser.data.payload.lastName)
            setEmail(foundUser.data.payload.email)
            setUsername(foundUser.data.payload.username)
          }
          findUser()
          
        }
      } catch (error) {
        console.log(error.message)
      }
     }, [props.user])
    


    return (
      <div>
        <div className="update-container">
            <h3>Profile</h3>
            <div>
                <p>First Name: {firstName}</p>
                <p>Last Name: {lastName}</p>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
            </div>
        </div>
      </div>
    )
  }


export default Profile