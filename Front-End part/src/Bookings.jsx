import React from 'react';
import {NavLink} from 'react-router-dom';
import male from '../src/image/male.svg';
import female from '../src/image/female.svg';

const Bookings=()=>{
	return(
	<div>
		<div className="my-5">
			<h1 className="text-center color-red">Doctor's Available</h1>
		</div>
		<div className="container-fluid mb-5">
			<div className="row">
				<div className="col-10 mx-auto">
					<div className="row">
						<div className="col-md-4 col-10 mx-auto">
							<div className="card c1">
							  <img src={male} className="card-img-top size text-center" alt="avtar"/>
							  <div className="card-body">
							  	<hr/>
							    <h5 className="card-title text-center color-red">Dr A</h5>
							    <p className="card-text text-center">Days:Mon-Fri<br/>Fees:5000</p>
							    <NavLink to="/doctor" class="btn btn-outline-danger text-center"><span className="resize">View Doctor</span></NavLink>
							    <NavLink to="/schedular" class="btn btn-outline-danger text-center"><span className="resize">View Schedule</span></NavLink>
							  </div>
							</div>
						</div>
						<div className="col-md-4 col-10 mx-auto">
							<div className="card c1">
							  <img src={female} className="card-img-top size text-center" alt="avtar"/>
							  <div className="card-body">
							  	<hr/>
							    <h5 className="card-title text-center color-red">Dr B</h5>
							    <p className="card-text text-center">Days:Mon-Fri<br/>Fees:5000</p>
							    <NavLink to="/doctor" class="btn btn-outline-danger text-center"><span className="resize">View Doctor</span></NavLink>
							    <NavLink to="/schedular" class="btn btn-outline-danger text-center"><span className="resize">View Schedule</span></NavLink>
							  </div>
							</div>
						</div>
						<div className="col-md-4 col-10 mx-auto">
							<div className="card c1">
							  <img src={male} className="card-img-top size text-center" alt="avtar"/>
							  <div className="card-body">
							  	<hr/>
							    <h5 className="card-title text-center color-red">Dr C</h5>
							    <p className="card-text text-center">Days:Mon-Fri<br/>Fees:5000</p>
							    <NavLink to="/doctor" class="btn btn-outline-danger text-center"><span className="resize">View Doctor</span></NavLink>
							    <NavLink to="/schedular" class="btn btn-outline-danger text-center"><span className="resize">View Schedule</span></NavLink>
							  </div>
							</div>
						</div>
					</div>
					<br/>
					<div class="row">
						<div className="col-md-4 col-10 mx-auto">
							<div className="card c1">
							  <img src={female} className="card-img-top size text-center" alt="avtar"/>
							  <div className="card-body">
							  	<hr/>
							    <h5 className="card-title text-center color-red">Dr D</h5>
							    <p className="card-text text-center">Days:Mon-Fri<br/>Fees:5000</p>
							    <NavLink to="/doctor" class="btn btn-outline-danger text-center"><span className="resize">View Doctor</span></NavLink>
							    <NavLink to="/schedular" class="btn btn-outline-danger text-center"><span className="resize">View Schedule</span></NavLink>
							  </div>
							</div>
						</div>
						<div className="col-md-4 col-10 mx-auto">
							<div className="card c1">
							  <img src={male} className="card-img-top size text-center" alt="avtar"/>
							  <div className="card-body">
							  	<hr/>
							    <h5 className="card-title text-center color-red">Dr E</h5>
							    <p className="card-text text-center">Days:Mon-Fri<br/>Fees:5000</p>
							    <NavLink to="/doctor" class="btn btn-outline-danger text-center"><span className="resize">View Doctor</span></NavLink>
							    <NavLink to="/schedular" class="btn btn-outline-danger text-center"><span className="resize">View Schedule</span></NavLink>
							  </div>
							</div>
						</div>
						<div className="col-md-4 col-10 mx-auto">
							<div className="card c1">
							  <img src={female} className="card-img-top size text-center" alt="avtar"/>
							  <div className="card-body">
							  	<hr/>
							    <h5 className="card-title text-center color-red">Dr F</h5>
							    <p className="card-text text-center">Days:Mon-Fri<br/>Fees:5000</p>
							    <NavLink to="/doctor" class="btn btn-outline-danger text-center"><span className="resize">View Doctor</span></NavLink>
							    <NavLink to="/schedular" class="btn btn-outline-danger text-center"><span className="resize">View Schedule</span></NavLink>
							  </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	);
};

export default Bookings;