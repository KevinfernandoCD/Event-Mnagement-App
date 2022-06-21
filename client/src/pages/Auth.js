import React,{ Component} from 'react';
import './Auth.css';
import logo from '../Images/logo.jpg';
import animatelogo from '../Images/animatelogo.jpg';
import AuthContext from  '../context/Context';

class AuthPage extends Component {

  constructor(props) {

    super(props);

    this.emailEl = React.createRef()
    this.passwordEl = React.createRef()
  
    this.state = {animate:false,signinMode:true,notify:false,errorMessage:"",loading:false};
   
  }

   //THIS IS ONE WAY OF CONNECTING TO THE CONTEXT PROVIDERS
    //AuthPage.contextType = AuthContext

    //AND THIS IS ANOTHER WAY USING STATIC (BUILTIN) PROPERTY

    static contextType = AuthContext


  componentDidMount ()   {

    setTimeout(() => {

      this.setState({...this.state,animate:true})

    },1000)

  }


  loginHandler = (e) => {

    e.preventDefault();

    this.setState({...this.state,loading:true})

    const email = this.emailEl.current.value
    const password = this.passwordEl.current.value

    if(email == '' || password == ''){

      this.setState({...this.state,notify:true,errorMessage:"All Fields Must Be Filled",loading:false})

      setTimeout(() => {

          this.setState({...this.state,notify:false,errorMessage:""})

      },10000)

    }

    if(email.trim().length == 0 || password.trim().length == 0){

      this.setState({...this.state,notify:true,errorMessage:"All Fields Must Be Filled",loading:false});

      setTimeout(() => {

        this.setState({...this.state,notify:false,errorMessage:""});

      },10000)

    }

    const requestBody = {

      query : `query{

        login(email:"${email}",password:"${password}"){
          userId
          token
          tokenExpiration
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

    this.context.login(data.data.login.token,data.data.login.userId,data.data.login.tokenExpiration,'events')

  })).catch((err) => {
  
    this.setState({...this.state,loading:false,errorMessage:"Invalid Password or Email Address",notify:true});

     setTimeout(() => {

        this.setState({...this.state,notify:false,errorMessage:""});

      },10000)

  })

  }

  submitHandler = (e) => {

    e.preventDefault();

    this.setState({...this.state,loading:true})

    let email = this.emailEl.current.value
    let password = this.passwordEl.current.value

    if(email == '' || password == ''){

      this.setState({...this.state,notify:true,errorMessage:"All Fields Must Be Filled",loading:false})

      setTimeout(() => {

          this.setState({...this.state,notify:false,errorMessage:""})

      },10000)

    }

    if(email.trim().length == 0 || password.trim().length == 0){

        this.setState({...this.state,notify:true,errorMessage:"All Fields Must Be Filled",loading:false});

      setTimeout(() => {

        this.setState({...this.state,notify:false,errorMessage:""});

      },10000)

    }

    const requestBody = {

      query : `mutation {

        createUser(eventInput:{email:"${email}",password:"${password}"}){
          id
          email
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

    email = ''
    password=''

    this.setState({...this.state,errorMessage:"Sign Up Successfull,Please Login again for authentication purposes",notify:true,signinMode:true,loading:false})

   setTimeout(() => {

      this.setState({...this.state,notify:false,errorMessage:""});

    },10000)

  })).catch((err) => {

    console.log(err)

    this.setState({...this.state,loading:false,errorMessage:"User Already Exists",notify:true});

     setTimeout(() => {

        this.setState({...this.state,notify:false,errorMessage:""});

      },10000)

  })

}

submitHandlerOnKey = (e) => {

  if(e.target.keyCode == 13){

       e.preventDefault();

    this.setState({...this.state,loading:true})

    let email = this.emailEl.current.value
    let password = this.passwordEl.current.value

    if(email == '' || password == ''){

      this.setState({...this.state,notify:true,errorMessage:"All Fields Must Be Filled",loading:false})

      setTimeout(() => {

          this.setState({...this.state,notify:false,errorMessage:""})

      },10000)

    }

    if(email.trim().length == 0 || password.trim().length == 0){

        this.setState({...this.state,notify:true,errorMessage:"All Fields Must Be Filled",loading:false});

      setTimeout(() => {

        this.setState({...this.state,notify:false,errorMessage:""});

      },10000)

    }

    const requestBody = {

      query : `mutation {

        createUser(eventInput:{email:"${email}",password:"${password}"}){
          id
          email
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

    email = ''
    password=''

    this.setState({...this.state,errorMessage:"Sign Up Successfull,Please Login again for authentication purposes",notify:true,signinMode:true,loading:false})

   setTimeout(() => {

      this.setState({...this.state,notify:false,errorMessage:""});

    },10000)

  })).catch((err) => {

    console.log(err)
    this.setState({...this.state,loading:false,errorMessage:"User Already Exists",notify:true});

     setTimeout(() => {

        this.setState({...this.state,notify:false,errorMessage:""});

      },10000)

  })


  }

  
}

    render() {

      return <div className='backdrop-div'>

        <div className='welcome-div'>
          <h2>{this.state.signinMode?"Sign In":"Sign Up Today!"}</h2>
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, </p>
       
       <form>
         <p className='instruction'>Please provide the following credentials</p>
          <label className='form-lable' htmlFor='email'>Email Address</label>
          <input ref={this.emailEl} type='text' className='input' id='email' placeholder='example@gmail.com'></input>
          <label className='form-lable' htmlFor='password'>Password</label>
          <input  ref={this.passwordEl}  type='password' className='input' id='password' placeholder='Enter a password'></input>
       
       {this.state.signinMode?<button onClick={this.loginHandler}  className='submitbtn'>Sign in</button>:<button onClick={this.submitHandler} onKeyDown={this.submitHandlerOnKey} className='signupbtn'>Sign up</button>}


       {this.state.signinMode?<div className='sign-up-div'>
        <p className='link-line'>Don't have an account yet?</p>
        <p className='signup-link' onClick={() => this.setState({...this.state,signinMode:!this.state.signinMode})}>Signup here</p>
       </div>:<div className='sign-up-div'>
        <p className='link-line'>Already have an account?</p>
        <p className='signup-link' onClick={() => this.setState({...this.state,signinMode:!this.state.signinMode})}>Login here</p>
       </div>} 
       {this.state.loading &&<div className='loader'></div>}   
      </form>
    </div>

  {this.state.animate && <div className='under-div'>
  <img src={animatelogo}/>
</div>}
    <div className='animation-div'>
      <img className='logo' src={logo}/>
    </div>
{
  this.state.notify &&
  <div className='notify-div'>
      <p className='notify-message'>{this.state.errorMessage}</p>
      <img className='notify-logo' src={logo}/>
    </div>
}
    </div>
    }
}

export default AuthPage



