import 'dart:ui';

import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  final TabController _tabController;
  Home(this._tabController);
  @override
  State<StatefulWidget> createState() {
    return HomeState(_tabController);
  }
}

class HomeState extends State<Home> {
  final TabController _tabController;
  HomeState(this._tabController);

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
      children: <Widget>[
        Text(
          "Welcome to Hospital+",
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 34,
            color: Colors.red,
          ),
          textAlign: TextAlign.center,
          overflow: TextOverflow.clip,
        ),
        SizedBox(height: 50),
        Text(
          "Greetings from our Staff and Faculty!",
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 24,
            color: Colors.redAccent,
          ),
          textAlign: TextAlign.center,
          overflow: TextOverflow.clip,
        ),
        SizedBox(height: 50),
        RaisedButton(
          focusColor: Colors.amber,
          color: Colors.red,
          child: Text("Register"),
          onPressed: () => _tabController
              .animateTo((_tabController.index + 1) % 3), // Switch tabs,
        ),
      ],
    ));
  }
}
