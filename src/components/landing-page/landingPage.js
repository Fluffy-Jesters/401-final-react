import React from 'react';
import Footer from '../footer/footer.js';
import './landingPage.scss';
import { useDispatch} from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/userReducer.js';
import LoggedOutNavbar from '../header/navbar/loggedOutNavbar.js';


export default function Landing() {


  const dispatch = useDispatch();

  function loginDispatch(user) {
    dispatch(actions.loginUser(user));
  }


  const loginData = Object.freeze({
    username: "",
    password: ""
  });

  const [formData, updateFormData] = React.useState(loginData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim()
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    try { 
      const resp = await axios({
      method: 'post',
      url: 'https://munchkin-auth.herokuapp.com/signin',
      auth: {
        username: formData.username,
        password: formData.password
      }
    })
    if(resp.status === 200) {
      // console.log(resp.data);
      localStorage.setItem("user login info",JSON.stringify(resp.data));
      loginDispatch(resp.data);
      window.location.href = '/playerHub';

    }
  } catch (err) {
      console.log(err);
  }
  };


  return (
    <>
      <LoggedOutNavbar />
      <div className="landing-container">
        <div className="landing-page">
          <label>
            <input name="username" onChange={handleChange} placeholder="Username" />
          </label>

          {/* <br /> */}

          <label>
            <input type="password" name="password" onChange={handleChange} placeholder="Password" id="myInput"/>
            </label>
          {/* <br /> */}
          
          <button onClick={handleSubmit}>Login</button>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
}

