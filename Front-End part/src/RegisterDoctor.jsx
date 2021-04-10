import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faPhone} from '@fortawesome/free-solid-svg-icons';
import register from '../src/image/register.svg';

const RegisterDoctor=()=>{
	return(
	<div>
		<div className="container">
			<div className="forms-container">
				<div className="signin-signup">
					<form action="" class="sign-in-form">
						<h2 className="title">Doctor Registration</h2>
						<div className="input-field">
							<FontAwesomeIcon className="i" icon={faUser} size="lg" />
							<input type="text" placeholder="Full Name" />
						</div>
						<div className="input-field">
							<FontAwesomeIcon className="i" icon={faLock} size="lg" />
							<input type="password" placeholder="Password" />
						</div>
						<div className="input-field">
							<FontAwesomeIcon className="i" icon={faLock} size="lg" />
							<input type="password" placeholder="Re-enter Password" />
						</div>
						<div className="input-field">
							<FontAwesomeIcon className="i" icon={faPhone} size="lg" />
							<input type="number" placeholder="Phone Number" />
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

export default RegisterDoctor;