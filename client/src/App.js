
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import  BookingsPage from './pages/Bookings';
import NavigationBar from './components/NavigationBar';
import Context from './context/Context';
import React,{ Component} from 'react';
import CreateEvent from './components/CreateEvent';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {token:null,userId:null,tokenExpiration:null,selectedPath:"auth",events:null,bookings:null};
   
  }

  login  = (token,userId,tokenExpiration,path) => {

    this.setState({...this.state,token:token,userId:userId,tokenExpiration:tokenExpiration,selectedPath:path})

  }

  setSelectedPath = (path) => {

    this.setState({...this.state,selectedPath:path})

  }

  logOut = () => {

    this.setState({...this.state,token:null,userId:null,selectedPath:"auth"})

  }

  setEvents = (eventsArray) => {


    this.setState({...this.state,events:eventsArray})


  }

  setBookings = (bookingsArray) => {

    this.setState({...this.state,bookings:bookingsArray})
  }

render() {

  return <BrowserRouter>
    <React.Fragment>
  <Context.Provider value={{token:this.state.token,userId:this.state.userId,login:this.login,logout:this.logOut,changePath:this.setSelectedPath,path:this.state.selectedPath,events:this.state.events,setEvents:this.setEvents,Bookings:this.state.bookings,setBookings:this.setBookings}}>
  <NavigationBar logOut={this.logOut} token={this.state.token} path={this.state.selectedPath} changePath={this.setSelectedPath}/>
    <main className='main-div'>
    <Routes>
      {!this.state.token && <Route  path="/" element={<Navigate replace to="/auth" />} />}
      <Route path='/events' element={<EventsPage token={this.state.token}/>}/>
      {!this.state.token && <Route path='/auth' element={<AuthPage path={this.state.selectedPath} changePath={this.setSelectedPath}/>}/>}
      {this.state.token && <Route path='/bookings' element={<BookingsPage token={this.state.token}/>}/>}
      {this.state.token &&<Route exact path="/" element={<Navigate replace to="/events" />} />}   
      {this.state.token &&<Route exact path="/auth" element={<Navigate replace to="/events" />} />}  
      {this.state.token && <Route path='/createevent' element={<CreateEvent token={this.state.token}/>}/>}     
  </Routes>
    </main>
   </Context.Provider>
  </React.Fragment>
  </BrowserRouter>

  }

 
}

export default App;
