import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faPhone, faCalendarAlt, faEnvelope, faVenusMars} from '@fortawesome/free-solid-svg-icons';
import register from '../src/image/register.svg';

const url = 'http://localhost:4000'
const RegisterPatient=(props)=>{
	const [name, setName]=useState("")
	const [gender, setGender]=useState("")
	const [date, setDate] = useState("")
	const [numb, setNumber] = useState("")
	const [email, setMail] = useState("")
	const [password1, setPassword1] = useState("")
	const [password2, setPassword2] = useState("")
	const [error, setError] = useState("")

	const change=(val, type)=>{
		//check the input type that is changed
		switch(type){
			case 'name':
				setName(val)
				break;
			case 'gender':
				setGender(val)
				break;
			case 'email':
				setMail(val)
				break;
			case 'password1':
				setPassword1(val)
				break;
			case 'password2':
				setPassword2(val)
				break;
			case 'date':
				let date = Date.parse(val)
				let now = Date.now()
				if(date < now){
					setDate(val)
				}
				break;
			case 'number':
				//allow only a specific input be accepted which are numbers,+,- and space
				let char = val[val.length-1]
				let filt = val.split("").filter(i=> i!=='+' && i!=='-' && i!==' ')
				
				if(Number(filt.join("")) || char === '+' || 
				char === '-' || char ===' ' || val===""){
					setNumber(val)
				}
				break;
			default:
				break;
		}
	}
	//submit function
	const submit=async(e)=>{
		e.preventDefault()
		//collate data
		const data={"FullName":name,"Email":email, "Gender":gender,
		"DateOfBirth":date, "Mobile":numb, "Password":password1}

		//fetch request
		if(password1.length>=6 && name.length>=3 && name.includes(' ') && email.length >3 && gender.length>=3 && numb.length>3){
			const method = {method:'POST',headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)}
			const res = await fetch(`${url}/patient/registerPatient`, method)
			let result
			//check for error status
			if(res.status ===400){
				try{
					result = await res.text()
				}catch(e){
					setError('An Error Occured')
				}
			}else{
				//check for non error or special status
				try{
					result = await res.json()
				}catch(e){
					setError('An Error Occured')
				}
			}
			//check if there is message
			if(result.message === 'success'){
				props.history.push('/bookings')
			}else{
				//if there isn't then there is an error
				let re = result.errors? result.errors[0] : result
				setError(re)
			}
			
		}else{
			setError("One or more fields are not properly filled")
		}
		setTimeout(()=>setError(""), 2500)
	}
	return(
	<div>
		<div className="container">
			<div className="forms-container">
				<div className="signin-signup">
					<form action="" class="sign-in-form" onSubmit={(e)=>submit(e)}>
						<h2 className="title">Patient Registration</h2>
						<div>{error}</div>
						<div className="input-field" style={{'alignItems':'center'}}>
							<FontAwesomeIcon className="i" icon={faUser} size="lg" />
							<input type="text" placeholder="Full Name" value={name} onChange={(e)=>{change(e.target.value,'name')}} required/>
						</div>
						<div className="input-field" style={{'alignItems':'center'}}>
							<FontAwesomeIcon className="i" icon={faEnvelope} size="lg" />
							<input type="email" placeholder="Email" value={email} onChange={(e)=>{change(e.target.value,'email')}} required/>
						</div>
						<div className="input-field" style={{'alignItems':'center'}}>
							<FontAwesomeIcon className="i" icon={faVenusMars} size="lg" />
							<input type="text" placeholder="Gender" value={gender} onChange={(e)=>{change(e.target.value,'gender')}} required/>
						</div>
						<div className="input-field" style={{'alignItems':'center'}}>
							<FontAwesomeIcon className="i" icon={faCalendarAlt} size="lg" />
							<input type="date" placeholder="Date of Birth" value={date} onChange={(e)=>{change(e.target.value,'date')}} required/>
						</div>
						<div className="input-field" style={{'alignItems':'center'}}>
							<FontAwesomeIcon className="i" icon={faPhone} size="lg" />
							<input type="text" placeholder="Phone Number" value={numb} onChange={(e)=>{change(e.target.value,'number')}} required/>
						</div>
						<div className="input-field" style={{'alignItems':'center'}}>
							<FontAwesomeIcon className="i" icon={faLock} size="lg" />
							<input type="password" placeholder="Password" value={password1} onChange={(e)=>{change(e.target.value,'password1')}} required/>
						</div>
						<input type="submit" value="Register" class="btn btn-outline-danger" />
					</form>

				</div>
			</div>
			<div className="panels-container">
				<div className="panel left-panel">
					<img src={register} className="image" alt="register"/>
				</div>
			</div>
		</div>
	</div>
	);
};

export default RegisterPatient;