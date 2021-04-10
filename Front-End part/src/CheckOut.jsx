import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faAddressCard, faBuilding} from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcAmex, faCcMastercard, faCcDiscover } from '@fortawesome/free-brands-svg-icons';

const CheckOut=()=>{
	return(
	<div>
		<h2 className="text-center red">Checkout Form</h2>
		<div className="row">
			<div className="col-75">
				<div className="contain">
					<form>
						<br/><br/>
						<div className="row">
							<div className="col-50">
								<h3 className="red">Billing Address</h3>
								<label for="fname"><FontAwesomeIcon className="i" icon={faUser} size="lg"/> Full Name</label>
								<input type="text" id="fname" name="firstname" placeholder="Name"/>
								<label for="email"><FontAwesomeIcon className="i" icon={faEnvelope} size="lg"/> Email Id</label>
								<input type="email" id="email" name="mail" placeholder="name@example.com"/>
								<label for="adr"><FontAwesomeIcon className="i" icon={faAddressCard} size="lg"/>Address</label>
								<input type="text" id="adr" name="address" placeholder="Your Address"/>
								<label for="city"><FontAwesomeIcon className="i" icon={faBuilding} size="lg"/>City</label>
								<input type="text" id="city" name="city" placeholder="City"/>
								<div className="row">
									<div className="col-50">
										<label for="state">State</label>
										<input type="text" id="state" name="state" placeholder="state"/>
									</div>
									<div className="col-50">
										<label for="zip">Zip</label>
										<input type="text" id="zip" name="zip" placeholder="Zip"/>
									</div>
								</div>
							</div>
							<div className="col-50">
								<h3 className="red">Payments</h3>
								<label for="fname">Accepted Cards</label>
								<div className="icon-container">
									<FontAwesomeIcon className="mr" icon={faCcVisa} color="navy" />
									<FontAwesomeIcon className="mr" icon={faCcMastercard} color="red" />
									<FontAwesomeIcon className="mr" icon={faCcAmex} color="blue" />
									<FontAwesomeIcon className="mr" icon={faCcDiscover} color="orange" />
								</div>
								<label for="cname">Name on Card</label>
								<input type="text" id="cname" name="cardname" placeholder="Name on Card"/>
								<label for="cnum">Card Number</label>
								<input type="text" id="cnum" name="cardnumber" placeholder="1111-2222-3333-4444"/>
								<label for="expmonth">Exp Month</label>
								<input type="text" id="expmonth" name="expmonth" placeholder="September"/>
								<div className="row">
									<div className="col-50">
										<label for="expyear">Exp Year</label>
										<input type="text" id="expyear" name="expyear" placeholder="2018"/>
									</div>
									<div className="col-50">
										<label for="cvv">CVV</label>
										<input type="text" id="cvv" name="cvv" placeholder="352"/>
									</div>
								</div>
							</div>
						</div>
						<input type="submit" value="Continue to Checkout" className="btn btn-outline-danger"/>
					</form>
				</div>
			</div>
		</div>	
	</div>
	);
	};

export default CheckOut;