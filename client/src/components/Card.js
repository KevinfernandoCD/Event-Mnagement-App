import React, { useState } from 'react';
import './Card.css';


const Card = ({event,userId,token}) => {

    const [expan,setExpand] = useState(false);

    const [booked,setBooked] = useState(false);

    const BookEvent = (eventId) => {

     setBooked(true)

    const requestBody = {

      query : `mutation {

        bookEvent(eventId:"${eventId}"){
          _id
          createdAt
          event{
            title
            date
            price
            type
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
     'Authorization':`Bearer ${token}`

    }

  }).then(

    res => res.json().then(data => {

        console.log(data.data.bookEvent)

    })

  ).catch(err => console.log(err))



    }

    return ( 

        <div className={expan?'card-div-expan':'card-div'}>
            <div className='img-div'>{userId == event.creator.id?<button className='bookbtn'>Owner</button>:<button onClick={() => BookEvent(event.id)} className={booked? 'bookedbtn':'bookbtn'}>{booked?<><i className="fa fa-check" aria-hidden="true"></i><lable style={{marginLeft:"5px"}}>Booked</lable></>:'Book Me'}</button>}</div>
            <div className='info-div'>
            <div className='name'><h4>{event.title}</h4>{expan?<i  onClick={() => setExpand(false)} className="fa-solid fa-angle-up downicon"></i>:<i onClick={() => setExpand(true)} className="fa-solid fa-angle-down downicon"></i>}</div>
            <div className='description'><p>{event.description}</p></div>       
            <div className='control-div'><h4> Type :</h4><p>{event.type}</p></div>
            <div className='control-div'><h4> Price :</h4><p>LKR.{event.price}</p></div>
            <div className='control-div'><h4> Date :</h4><p>{event.date}</p></div>          
        </div>

    </div>

    );
}
 
export default Card;