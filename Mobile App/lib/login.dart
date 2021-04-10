import 'package:flutter/material.dart';
import 'package:vc/doctorlogin.dart';

import './patientlogin.dart';

class Login extends StatefulWidget {
  bool patient;
  bool doctor;
  final PageController _pageController;
  Login(this._pageController, this.patient, this.doctor);
  @override
  State<StatefulWidget> createState() {
    return LoginState(_pageController, patient, doctor);
  }
}

class LoginState extends State<Login> {
  PageController _pageController;
  bool patient = false;
  bool doctor = false;
  LoginState(this._pageController, this.patient, this.doctor);

  @override
  void initState() {
    super.initState();
    _pageController = new PageController();
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  Widget getPatientLogin() {
    return PatientLogin(_pageController);
  }

//PatientLogin(_pageController)
  @override
  Widget build(BuildContext context) {
    return (!patient && !doctor)
        ? (Container(
            child: Column(
            children: <Widget>[
              Text(
                "Patient & Doctor Login Portal",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 34,
                  color: Colors.redAccent.shade100,
                ),
                overflow: TextOverflow.clip,
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 50),
              Container(
                  margin: const EdgeInsets.all(15.0),
                  padding: const EdgeInsets.all(3.0),
                  decoration: BoxDecoration(
                    border: Border.all(),
                  ),
                  child: Column(children: <Widget>[
                    FlatButton.icon(
                        onPressed: () => setState(() {
                              doctor = !doctor;
                            }),
                        icon: Icon(Icons.medical_services_outlined),
                        label: Text("Doctors"))
                  ])),
              SizedBox(height: 50),
              Container(
                  margin: const EdgeInsets.all(15.0),
                  padding: const EdgeInsets.all(3.0),
                  decoration: BoxDecoration(
                    border: Border.all(),
                  ),
                  child: Column(children: <Widget>[
                    FlatButton.icon(
                        onPressed: () => setState(() {
                              patient = !patient;
                            }),
                        icon: Icon(Icons.people_alt_rounded),
                        label: Text("Patients"))
                  ])),
            ],
          )))
        : ((patient && !doctor)
            ? PatientLogin(_pageController)
            : (doctor && !patient)
                ? DoctorLogin(_pageController)
                : Container());
  }
}

/*
Text(
                      "Doctors",
                      textScaleFactor: 3,
                      textAlign: TextAlign.center,
                    ),
                    IconButton(
                      iconSize: 50,
                      alignment: Alignment.center,
                      icon: new Icon(
                        Icons.medical_services,
                      ),
                      onPressed: () => setState(() {
                        doctor = !doctor;
                      }),
                    ),



Text(
                      "Patients",
                      textScaleFactor: 3,
                      textAlign: TextAlign.center,
                    ),
                    IconButton(
                      iconSize: 50,
                      alignment: Alignment.center,
                      icon: new Icon(
                        Icons.people_outline,
                      ),
                      onPressed: () => setState(() {
                        patient = !patient;
                      }),
                    ),
*/
