import 'package:flutter/material.dart';
import 'package:vc/home.dart';
import 'package:vc/login.dart';

import './register.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      home: new Dashboard(),
    );
  }
}

class Dashboard extends StatefulWidget {
  const Dashboard({Key key}) : super(key: key);

  @override
  _DashboardState createState() => new _DashboardState();
}

class _DashboardState extends State<Dashboard>
    with SingleTickerProviderStateMixin {
  final List<Tab> myTabs = <Tab>[
    new Tab(icon: new Icon(Icons.home)),
    new Tab(icon: new Icon(Icons.app_registration)),
    new Tab(icon: new Icon(Icons.login_rounded)),
  ];

  TabController _tabController;
  PageController _pageController;

  @override
  void initState() {
    super.initState();
    _tabController = new TabController(vsync: this, length: myTabs.length);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        home: DefaultTabController(
      length: 3,
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        resizeToAvoidBottomPadding: false,
        backgroundColor: Colors.redAccent.shade50,
        appBar: PreferredSize(
            preferredSize: Size.fromHeight(100.0),
            child: AppBar(
              centerTitle: true,
              title: Text("Hospital+"),
              backgroundColor: Colors.redAccent,
              bottom: TabBar(
                tabs: <Tab>[
                  new Tab(icon: new Icon(Icons.home)),
                  new Tab(icon: new Icon(Icons.app_registration)),
                  new Tab(icon: new Icon(Icons.login_rounded)),
                ],
                controller: _tabController,
              ),
            )),
        body: TabBarView(
          controller: _tabController,
          children: [
            Container(
              alignment: Alignment.center,
              width: double.infinity,
              height: double.infinity,
              child: SingleChildScrollView(child: Home(_tabController)),
            ),
            Container(
              alignment: Alignment.center,
              width: double.infinity,
              height: double.infinity,
              child: SingleChildScrollView(child: Register()),
            ),
            Container(
              alignment: Alignment.center,
              width: double.infinity,
              height: double.infinity,
              child: SingleChildScrollView(
                  child: Login(_pageController, false, false)),
            ),
          ],
        ),
      ),
    ));
  }
}

/*
BackButton(
                onPressed: null,
              ),
Column(children: [
      AppBar(
        backgroundColor: Colors.redAccent,
        title: Text("Home"),
        titleSpacing: 0.0,
      ),
    ]);
*/

/*
AppBar(
  leading: Icon(Icons.menu),
  title: Text('Page title'),
  actions: [
    Icon(Icons.favorite),
    Padding(
      padding: EdgeInsets.symmetric(horizontal: 16),
      child: Icon(Icons.search),
    ),
    Icon(Icons.more_vert),
  ],
  backgroundColor: Colors.purple,
),
*/
/*
Scaffold(
      resizeToAvoidBottomPadding: false,
      body: AppBar(
        title: Text("f"),
      ),
      bottomNavigationBar: BottomNavigationBar(items: [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: "Home",
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: "Home",
        )
      ]),
    );
    */
