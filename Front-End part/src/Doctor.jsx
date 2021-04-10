import React from 'react';
import {NavLink} from 'react-router-dom';
import doctor from '../src/image/doctor.svg';

const Doctor=()=>{
	return(
	<div>
		<div className="container2">
        <div className="card1">
            <div className="Background">
                <div className="gradients">
                    <div className="gradient second" color="blue"></div>
                    <div className="gradient" color="red"></div>
                    <div className="gradient" color="green"></div>
                    <div className="gradient" color="orange"></div>
                    <div className="gradient" color="black"></div>
                </div>
                <img src={doctor} alt="doctor" className="logo"/>
            </div>
            <div className="info">
                <div className="docName">
                    <div>
                        <h1 className="big">Dr A</h1>
                    </div>
                    <h3 className="small">MD in Deramatology</h3>
                </div>
                <div className="description">
                    <h3 className="title">Skin Specialist</h3>
                    <p className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
                </div>
                <div className="buy-price">
                    <NavLink to="/schedular" class="btn btn-outline-danger text-center"><span className="resize">View Schedule</span></NavLink>
                    <div className="price">
                        <h1>500</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
	</div>
	);
};
export default Doctor;