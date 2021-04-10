import React, { useState , useEffect,props} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import login from '../src/image/login.svg';
import Bookings from './Bookings';
import { propTypes } from 'react-bootstrap/esm/Image';
const Login=(props) =>{
    
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [appState, setAppState] = useState({
        loading: false,
        credentials: null,
      });
 
    function handleSubmit(event) {
        
        event.preventDefault();
        
        let data={Mobile:PhoneNumber,Password:password};
        
        let method={method:'Post',headers:{'Content-type':'application/json'},body:JSON.stringify(data)};
const getLogin= async ()=>{
        let res= await fetch(`http://localhost:4000/patient/loginPatient`,method)
        try{  
        
          
          let credentials = await res.json();
              console.log(credentials)
              setAppState({ loading: false, credentials: credentials.token });
              if(credentials.message=='Logged in successfully'){
                  
                props.history.push('/bookings')
            }}
            catch(error){
                console.log("error",error)
            }
        }
        getLogin()
    
           
    
        
 
      
            
    }
  
      
    return(
    <div>
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="" onSubmit={handleSubmit} class="sign-in-form">
                        <h2 className="title">Patient Login</h2>
                        <div className="input-field">
                            <FontAwesomeIcon className="i" icon={faUser} size="lg" />
                            <input type="text" onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
                        </div>
                        <div className="input-field">
                            <FontAwesomeIcon className="i" icon={faLock} size="lg" />
                            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
                        </div>
                            <input type="submit" value="Login" class="btn btn-outline-danger" />
                    </form>
                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <img src={login} className="image" alt="register"/>
                </div>
            </div>
        </div>
    </div>
    );
};
 
export default Login;