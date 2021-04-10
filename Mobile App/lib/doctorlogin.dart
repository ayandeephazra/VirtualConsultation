import 'package:flutter/material.dart';

class DoctorLogin extends StatefulWidget {
  final PageController _pageController;
  DoctorLogin(this._pageController);
  @override
  State<StatefulWidget> createState() {
    return DoctorLoginState(_pageController);
  }
}

class DoctorLoginState extends State<DoctorLogin> {
  final PageController _pageController;
  DoctorLoginState(this._pageController);
  String _phonenumber;
  String _password;
  Widget _buildPhoneNumber() {
    return TextFormField(
        keyboardType: TextInputType.phone,
        decoration: InputDecoration(labelText: "Phone Number"),
        validator: (String value) {
          if (value.isEmpty) {
            return 'Phone Number is required';
          }
          if (value.length != 10) {
            return "Enter a valid 10 digit Phone Number";
          }
          return null;
        },
        onSaved: (String value) {
          _phonenumber = value;
        });
  }

  Widget _buildPassword() {
    return TextFormField(
        keyboardType: TextInputType.visiblePassword,
        decoration: InputDecoration(labelText: "Password"),
        validator: (String value) {
          if (value.isEmpty) {
            return 'Password is required';
          }
          if (value.length < 8) {
            return "Please enter a Password that is 8 characters or longer";
          }
          if (!RegExp(
                  r"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")
              .hasMatch(value)) {
            return "Please enter atleast one Special Character, Digit and a Letter";
          }
          return null;
        },
        onSaved: (String value) {
          _password = value;
        });
  }

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: EdgeInsets.all(24),
        child: Column(children: <Widget>[
          Text(
            "Doctor Sign In Portal",
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 34,
              color: Colors.redAccent.shade100,
            ),
            overflow: TextOverflow.clip,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 50),
          Form(
              key: _formKey,
              child: Column(children: <Widget>[
                Icon(Icons.local_hospital_rounded),
                _buildPhoneNumber(),
                _buildPassword(),
                SizedBox(height: 100),
                RaisedButton(
                  child: Text("Login"),
                  onPressed: () {
                    if (!_formKey.currentState.validate()) {
                      return;
                    } else {
                      _formKey.currentState.save();
                    }
                  },
                ),
              ]))
        ]));
  }
}
