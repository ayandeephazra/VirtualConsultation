import React from 'react';
import Home from './Home';
import Bookings from './Bookings';
import BookMe from './BookMe';
import RegisterPatient from './RegisterPatient';
import LoginPatient from './LoginPatient';
import LoginDoctor from './LoginDoctor';
import Schedular from './Schedular';
import Navbar from './Navbar';
import CheckOut from './CheckOut';
import Doctor from './Doctor';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import {Switch, Route, Redirect} from 'react-router-dom';

const App=()=>{
	return(
	<div>
	<Navbar/>
	<Switch>
	<Route exact path="/" component={Home} />
	<Route exact path="/bookings" component={Bookings} />
	<Route exact path="/bookme" component={BookMe} />
	<Route exact path="/registerpatient" component={RegisterPatient} />
	<Route exact path="/loginpatient" component={LoginPatient} />
	<Route exact path="/logindoctor" component={LoginDoctor} />
	<Route exact path="/schedular" component={Schedular} />
	<Route exact path="/checkout" component={CheckOut} />
	<Route exact path="/doctor" component={Doctor} />
	<Redirect to="/" />
	</Switch>
	</div>
	);
};

export default App;