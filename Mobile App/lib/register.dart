import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

// Define a custom Form widget.
class Register extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return RegisterState();
  }
}

// Define a corresponding State class.
// This class holds data related to the form.
class RegisterState extends State<Register> {
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a `GlobalKey<FormState>`,
  // not a GlobalKey<MyCustomFormState>.
  String _name;
  String _email;
  String _gender;
  String _phonenumber;
  String _password;
  Widget _buildName() {
    return TextFormField(
        decoration: InputDecoration(labelText: "Full Name"),
        validator: (String value) {
          if (value.isEmpty) {
            return 'Full Name is required';
          }
          return null;
        },
        onSaved: (String value) {
          _name = value;
        });
  }

  Widget _buildEmail() {
    return TextFormField(
        keyboardType: TextInputType.emailAddress,
        decoration: InputDecoration(labelText: "Email Address"),
        validator: (String value) {
          if (value.isEmpty) {
            return 'Email Address is required';
          }
          if (!RegExp(
                  r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
              .hasMatch(value)) {
            return "Please enter a valid Email Address";
          }
          return null;
        },
        onSaved: (String value) {
          _email = value;
        });
  }

  Widget _buildGender() {
    return TextFormField(
        decoration: InputDecoration(labelText: "Gender"),
        validator: (String value) {
          if (value.isEmpty) {
            return 'Gender is required';
          }
          return null;
        },
        onSaved: (String value) {
          _gender = value;
        });
  }

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
    // Build a Form widget using the _formKey created above.
    return Container(
        margin: EdgeInsets.all(24),
        child: Column(children: <Widget>[
          Text(
            "Patient Registration Portal",
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
                _buildName(),
                _buildEmail(),
                _buildGender(),
                _buildPhoneNumber(),
                _buildPassword(),
                RaisedButton(
                  child: Text("Submit"),
                  onPressed: () {
                    if (!_formKey.currentState.validate()) {
                      return;
                    } else {
                      _formKey.currentState.save();
                      print("GGGGG0");
                      signUp(_name, _email, _gender, _phonenumber, _password);
                    }
                  },
                ),
              ]))
        ]));
  }
}

Future<http.Response> signUp(
    _name, _email, _gender, _phonenumber, _password) async {
  var url = "http://localhost:3000/signup";
  final http.Response response = await http.post(
    url,
    headers: <String, String>{
      'Content-type': 'application/json; charset-UTF-8',
    },
    body: jsonEncode(<String, String>{
      'name': _name,
      'email': _email,
      'gender': _gender,
      'phonenumber': _phonenumber,
      'password': _password,
    }),
  );

  print(response.body);
  return response;
/*
  if (response.statusCode == 201) {
  } else {
    throw Exception("Failed to create album");
  }
  */
}
