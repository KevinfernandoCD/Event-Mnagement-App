import React from 'react';
import './BookingRow.css';


const BookingRow = ({bookinginfo,token,getBookings}) => {

    const CancelBooking = (bookingId) => {

    const requestBody = {

      query : `mutation {

        cancelBooking(bookingId:"${bookingId}"){
         id
         creator{
          createdEvents{
               title
               id
          }
         }
        }
      }`
    }


  fetch('http://localhost:5000/graphql',{

    method:'POST',
    body:JSON.stringify(requestBody),

    headers:{

     'Content-Type': 'application/json',
     'Authorization':`Bearer ${token}`,

    }

  }).then(res => res.json().then(data => {

     console.log(data.data.cancelBooking);

     getBookings();


  })).catch(err => {

     console.log(err)

  })

}

     
    return ( <div className='booking-main-div'>

        <div className='prop-class'>
             <label>Ref No</label>
             <p>{bookinginfo._id}</p>
        </div>

           <div className='prop-class'>
             <label>Title</label>
             <p>{bookinginfo.event.title}</p>
        </div>

          <div className='prop-class'>
             <label>Event Type</label>
             <p>{bookinginfo.event.type}</p>
        </div>

          <div className='prop-class'>
             <label>Event Host Date</label>
             <p>{bookinginfo.event.date}</p>
        </div>

          <div className='prop-class'>
             <label>Booked Date</label>
             <p>{bookinginfo.createdAt}</p>
        </div>
       

         <div className='prop-class'>
             <label>Event ID</label>
             <p>{bookinginfo.event.id}</p>
        </div>

          <div className='prop-class'>
             <label>Price</label>
             <p>LKR.{bookinginfo.event.price}</p>
        </div>


        <button onClick={() => CancelBooking(bookinginfo._id)} className='cancel-booking'>Cancel Booking</button>
       
       
       
    </div> );
}
 
export default BookingRow;