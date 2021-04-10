import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLock} from '@fortawesome/free-solid-svg-icons';
import login from '../src/image/login.svg';
import { useState } from 'react';

const url = 'http://localhost:4000'

const LoginDoctor=(props)=>{
	const [password, setPassword] = useState("")
	const [numb, setNumber] = useState("")
	const [error, setError] = useState("")

	const change=(val,type)=>{
		//check if number input is used or password
		if(type==='number'){
			setNumber(val)
		}else{
			setPassword(val)
		}
	}

	const submit=async(e)=>{
		//fetch the result from the server
		e.preventDefault()
		const data = {Mobile:numb, Password: password }
		const method={method:'POST',headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)}
		const res = await fetch(`${url}/doctor/loginDoctor`, method)
		let result
		//console.log(res)
		// check for error message or not
		if(res.ok){
			try{
				result = await res.json()
			}catch(e){
				setError('An Error Occured')
			}
		}else{
			try{
				result = await res.text()
			}catch(e){
				setError('An Error Occured')
			}
		}
		//console.log(result)
		// check for success message or display what the server returns
		if(result && result.message==='Logged in successfully'){
			props.history.push('/bookings')
		}else{
			setError(result)
		}
	}

	return(
	<div>
		<div className="container">
			<div className="forms-container">
				<div className="signin-signup">
					<form action="" class="sign-in-form" onSubmit={submit}>
						<h2 className="title">Doctor Login</h2>
						<div>{error}</div>
						<div className="input-field" style={{'alignItems':'center'}}>
							<FontAwesomeIcon className="i" icon={faPhone} size="lg" />
							<input type="text" placeholder="Mobile" value={numb} onChange={(e)=> change(e.target.value,'number')}/>
						</div>
						<div className="input-field" style={{'alignItems':'center'}}>
							<FontAwesomeIcon className="i" icon={faLock} size="lg" />
							<input type="password" placeholder="Password" value={password} onChange={(e)=> change(e.target.value, 'password')} />
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

export default LoginDoctor;