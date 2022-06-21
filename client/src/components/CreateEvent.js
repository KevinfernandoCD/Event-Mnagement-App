import React, { useEffect, useState } from 'react';
import './CreateEvent.css';
import {useNavigate} from 'react-router-dom';


const CreateEvent = ({token}) => {

    const [animate,setAnimate] = useState(false);
    const [title,setTitle] = useState('');
    const [type,setType] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [price,setPrice] = useState();
    const [loading ,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');

    const history = useNavigate();

    useEffect(() => {

        setTimeout(() => {

            setAnimate(true)

        },2000)


    },[]);

    const submitEvent = (e) => {

         e.preventDefault();

         setLoading(true);


         if(description.length < 25){

             setError(true)

            setErrorMessage('Description must be longer than 25 characters');

            setTimeout(() => {

                setError(false)
                setErrorMessage('')

            },8000)

             setLoading(false);
        }

         if(title == ''|| type == ''||description == ''|| date == ''|| price <= 0){

            setError(true)

            setErrorMessage('All fields must be filled');

            setTimeout(() => {

                setError(false)
                setErrorMessage('')

            },8000)

            setLoading(false);
            
         }

          if(title.trim().length == 0|| type.trim().length == 0||description.trim().length == 0|| date.trim().length == 0|| price <= 0) {


            setError(true)

            setErrorMessage('All fields must be filled');

            setTimeout(() => {

                setError(false)
                setErrorMessage('')

            },8000)

             setLoading(false);
            
         }

    if((title.trim().length !== 0|| type.trim().length !== 0||description.trim().length !== 0|| date.trim().length !== 0|| price > 0) && (description.length > 25) ) {

    const requestBody = {

      query : `mutation {

        createEvent(eventInput:{title:"${title}",description:"${description}",type:"${type}",date:"${date}",price:${price}}){
            
            id
            title
            description
            type
            date
            price
            creator {

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

     'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`,

    }

  }).then(res => res.json().then(data => {

    setLoading(false);

    console.log(data)

    history('/events')
 
  })).catch(error => {
    
      setError(true)

            setErrorMessage('Something went wrong');

            setTimeout(() => {

                setError(false)
                setErrorMessage('')

            },8000)

    setLoading(false);

        })

    }
} 


const createonKey = (e) => {

    if(e.target.keyCode == 13){

        
         e.preventDefault();

         setLoading(true);


         if(description.length < 25){

             setError(true)

            setErrorMessage('Description must be longer than 25 characters');

            setTimeout(() => {

                setError(false)
                setErrorMessage('')

            },8000)

             setLoading(false);
        }

         if(title == ''|| type == ''||description == ''|| date == ''|| price <= 0){

            setError(true)

            setErrorMessage('All fields must be filled');

            setTimeout(() => {

                setError(false)
                setErrorMessage('')

            },8000)

            setLoading(false);
            
         }

          if(title.trim().length == 0|| type.trim().length == 0||description.trim().length == 0|| date.trim().length == 0|| price <= 0) {


            setError(true)

            setErrorMessage('All fields must be filled');

            setTimeout(() => {

                setError(false)
                setErrorMessage('')

            },8000)

             setLoading(false);
            
         }

    if((title.trim().length !== 0|| type.trim().length !== 0||description.trim().length !== 0|| date.trim().length !== 0|| price > 0) && (description.length > 25) ) {

    const requestBody = {

      query : `mutation {

        createEvent(eventInput:{title:"${title}",description:"${description}",type:"${type}",date:"${date}",price:${price}}){
            
            id
            title
            description
            type
            date
            price
            creator {

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

     'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`,

    }

  }).then(res => res.json().then(data => {

    setLoading(false);

    console.log(data)

    history('/events')
 
  })).catch(error => {
    
      setError(true)

            setErrorMessage('Something went wrong');

            setTimeout(() => {

                setError(false)
                setErrorMessage('')

            },8000)

    setLoading(false);

        })

    }
} 


const createonKey = (e) => {

    if(e.target.keyCode == 13){

        
    }


    }

}

    return ( 

        <div className='contain-div'>

           {error && <div className='error-message-div'>{errorMessage}</div>} 

            <form className='form-el'>

               {loading && <div className='loading-line'></div>} 

            <h2 className='heading'>Create Your Own Event</h2>
            <p className='sub-heading'>Plan and Create Your Own Event as You Want</p>

            <label className='event-prop' htmlFor='title'>
                Event Title
            </label>

            <input className='event-val' onKeyPress={createonKey}  onChange={(e)=>setTitle(e.target.value)} type='text'/>
            <label className='event-prop' htmlFor='desc'>
                Description (Minimum word count is 25)
            </label>

            <textarea maxlength={250}  onKeyPress={createonKey}  className=' desc' onChange={(e)=>setDescription(e.target.value)} type='text'/>

            
            <label className='event-prop' htmlFor='type'>
                Category
            </label>

        <select className='event-val' onChange={(e)=>setType(e.target.value)}>
            <option>All</option>
            <option>Entertainment</option>
            <option>Educational</option>
            <option>Adult</option>
        </select>


        <label className='event-prop' htmlFor='desc'>
            Host Date
        </label>
            <input className='event-val'  onKeyPress={createonKey}  type='Date' onChange={(e)=>setDate(e.target.value)}/>

             <label className='event-prop' htmlFor='desc'>
                Ticket Price (Please add the minimum ticket price if there's a price range)
            </label>

            <input className='event-val' type='number'  onKeyPress={createonKey} onChange={(e)=>setPrice(e.target.value)} placeholder='LKR.'/>

            <button className='createbtn' onClick={submitEvent}>Create</button>
            </form>

            <div className='anime-div'>

                {animate && <div className='brand'>BookMe<lable className='domain'>.LK</lable></div>}

                <div  className='stripe1'></div>
                <div  className='stripe2'></div>
                <div  className='stripe3'></div>

            </div>
           
        </div>
     );
}
 
export default CreateEvent;