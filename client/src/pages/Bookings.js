import React,{ Component} from 'react';
import BookingRow from '../components/BookingRow';
import AuthContext from '../context/Context';

class BookingsPage extends Component {

  static contextType = AuthContext

  getBooking = () => {

      const requestBody = {

      query : `query {

        getBookings{
          _id
          createdAt
          event{
            title
            date
            price
            type
            id  
          }

          bookeduser{
            id
          }
        }
      }`
    }


  fetch('http://localhost:5000/graphql',{

    method:'POST',
    body:JSON.stringify(requestBody),

    headers:{

     'Content-Type': 'application/json',
     'Authorization':`Bearer ${this.props.token}`

    }

  }).then(res=> res.json().then(data => {

    console.log(data.data.getBookings)

   this.context.setBookings(data.data.getBookings)

  })).catch(error => {console.log(error)})


  }

  componentDidMount () {

    this.getBooking();

  }

    render() {

      return this.context.Bookings?.length !== 0? this.context.Bookings?.map(booking => booking.bookeduser.id == this.context.userId? <BookingRow bookinginfo={booking} token={this.context.token} getBookings={this.getBooking}/> :null):<div>You Have No Bookings</div>

    }

}

export default BookingsPage



