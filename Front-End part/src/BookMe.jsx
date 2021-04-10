import React from 'react';
import {NavLink} from 'react-router-dom';

const BookMe=()=>{
	return(
	<div>
		<form action="">
    <div className="form-group">
      <h2 className="heading">Booking & Contact</h2>
      <div className="box1">
      <div className="controls">
        <input type="text" id="name" className="floatLabel" name="name"/>
        <label for="name">Name</label>
      </div>
      <div className="controls">
        <input type="text" id="email" className="floatLabel" name="email"/>
        <label for="email">Email</label>
      </div>       
      <div class="controls">
        <input type="tel" id="phone" className="floatLabel" name="phone"/>
        <label for="phone">Phone</label>
      </div>
        <div className="grid">
          <div className="col-2-3">
            <div className="controls">
             <input type="text" id="street" className="floatLabel" name="street"/>
             <label for="street">Street</label>
            </div>          
          </div>
          <div className="col-1-3">
            <div className="controls">
              <input type="number" id="street-number" className="floatLabel" name="street-number"/>
              <label for="street-number">Number</label>
            </div>          
          </div>
        </div>
        <div className="grid">
          <div className="col-2-3">
            <div className="controls">
              <input type="text" id="city" className="floatLabel" name="city"/>
              <label for="city">City</label>
            </div>         
          </div>
          <div className="col-1-3">
            <div className="controls">
              <input type="text" id="post-code" className="floatLabel" name="post-code"/>
              <label for="post-code">Post</label>
            </div>         
          </div>
        </div>
        <div class="controls">
          <input type="text" id="country" className="floatLabel" name="country"/>
          <label for="country">Country</label>
        </div>
    </div>
  </div>
  <div className="form-group">
    <h2 className="heading">Details</h2>
    <div className="box2">
    <div className="grid">
    <div className="col-2-4 col-2-4-sm">
      <div className="controls">
        <input type="date" id="arrive" className="floatLabel" name="arrive" value="<?php echo date('Y-m-d'); ?>"/>
        <label for="arrive" className="label-date"><i class="fa fa-calendar"></i>&nbsp;&nbsp;Date</label>
      </div>      
    </div>
    <div className="col-2-4 col-2-4-sm">
      <div className="controls">
        <input type="time" id="depart" className="floatLabel" name="depart" value="<?php echo date('Y-m-d'); ?>" />
        <label for="depart" className="label-date"><i class="fa fa-time"></i>&nbsp;&nbsp;Time</label>
      </div>      
    </div>
      </div>
      <div className="grid">
        <p className="info-text">Please mention your condition and allergies if any</p>
        <br/>
        <div className="controls">
          <textarea name="comments" className="floatLabel" id="comments"></textarea>
          <label for="comments">Conditions</label>
          </div>
      </div>  
  </div>
  <NavLink to="/checkout" class="btn btn-outline-danger text-center"><span className="resize">Book Me</span></NavLink>
  </div>
</form>
	</div>
	);
};

export default BookMe;