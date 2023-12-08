import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route,Routes, Navigate } from 'react-router-dom';
import { Provider as AlertProvider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { positions } from 'react-alert'

import Login from './accounts/Login';
import Register from './accounts/Register';
import Header from './layout/Header';
import Dashboard from './home/Dashboard';
import Alerts from './layout/Alerts';
import PrivateRoute from './common/PrivateRoute';
import Calendar from './calendar/Calendar';
import Profile from './profile/Profile';

//import Discussion from './discussions/Discussion';
//import DiscussionMain from './discussions/DiscussionMain';
//import NewDiscussion from './discussions/NewDiscussion';
import Discussions from './discussions/Discussions';
import { Provider } from 'react-redux';
import store from "../store";
import { loadUser } from '../actions/auth';

import TasksApp from './tasks/TasksApp';
import Settings from './settings/Settings';
import Performance from './performance/Performance';

// Alert options
const alertOptions = {
    timeout: 2000,
    position: positions.TOP_CENTER,
};

class App extends Component{
    // fire when main app is loaded
    componentDidMount(){
        store.dispatch(loadUser());
    };

    render(){
        return(
            <Provider store={store}>
                <AlertProvider template = {AlertTemplate}{...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header/>
                            <Alerts/>
                            <div className="container-lg">
                                <Routes>
                                    <Route exact path ="/" element= {
                                        <PrivateRoute>
                                            <Dashboard/>
                                        </PrivateRoute>
                                    }/>
                                    <Route exact path ="/tasks" element= {
                                        <PrivateRoute>
                                            <TasksApp/>
                                        </PrivateRoute>
                                    }/>
                                    <Route exact path ="/settings" element= {
                                        <PrivateRoute>
                                            <Settings/>
                                        </PrivateRoute>
                                    }/>
                                    <Route exact path ="/profile" element= {
                                        <PrivateRoute>
                                            <Profile/>
                                        </PrivateRoute>
                                    }/>
                                    <Route exact path ="/calendar" element= {
                                        <PrivateRoute>
                                            <Calendar/>
                                        </PrivateRoute>
                                    }/>
                                    <Route exact path ="/discussions" element= {
                                        <PrivateRoute>
                                            <Discussions/>
                                        </PrivateRoute>
                                    }/>
                                    <Route exact path ="/performance" element= {
                                        <PrivateRoute>
                                            <Performance/>
                                        </PrivateRoute>
                                    }/>
                                    {/*
                                    <Route exact path ="/discussion" element= {
                                        <PrivateRoute>
                                           <DiscussionMain/>
                                        </PrivateRoute>
                                    }/>
                                    <Route exact path ="/newDiscussion" element= {
                                        <PrivateRoute>
                                            <NewDiscussion/>
                                        </PrivateRoute>
                                    }/>

                                    <Route exact path ="/message" element= {
                                        <PrivateRoute>
                                            <Discussion/>
                                        </PrivateRoute>
                                    }/>
                                    */}
                                    <Route exact path ="/register"element={
                                        <Register/>
                                    }/>
                                    <Route exact path ="/login" element={
                                        <Login/>
                                    }/>
                                </Routes>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.createRoot(
    document.getElementById("app"),
    )
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );

document.body.style.backgroundColor = '#FFF6E0';