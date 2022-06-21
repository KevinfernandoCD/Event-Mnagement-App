import React,{ Component} from 'react';
import './Event.css';
import Card from '../components/Card';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/Context';


class EventsPage extends Component {

  constructor(props){

    super(props)
  
  }

  static contextType = AuthContext

  getEvents = () => {

    const requestBody = {


      query:`query{

        getEvents{
          title
          date
          description
          price
          type
          id
          creator{
            id
            email
          }
        }

      }`

    }

   fetch('http://localhost:5000/graphql',{

    method:'POST',
    body:JSON.stringify(requestBody),

    headers:{

     'Content-Type': 'application/json'

    }

  }).then(res => res.json().then(data => {

    console.log(data.data.getEvents)

    this.context.setEvents(data.data.getEvents)

  })).catch(error => {

    console.log(error)

  })

} 

  componentDidMount () {

    this.getEvents();

  }

    render() {

      return <div className='main-div'>

        {this.props.token && <NavLink className='btn' to="/createevent"><i className="fa fa-plus" aria-hidden="true"></i>Create Event</NavLink>}

<div className='events-main-div'>

   {this.context?.events?.length !== 0? this.context?.events?.map(event => <Card key={event.id} token={this.context.token} event={event} userId={this.context.userId}/>):<div>No Events Available</div>}
       
</div>
       
  </div>

    }

}

export default EventsPage



