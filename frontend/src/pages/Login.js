import React from 'react'

import { useRef } from 'react'

import HttpClientService from '../services/HttpClient'

//state
import { useDispatch } from 'react-redux'
import { setAuth } from '../state/UserAuth'

//notification manager
import NotificationManager from 'react-notifications/lib/NotificationManager'

export default function Login() {

  var username = useRef('')
  var password = useRef('')

  const dispatch = useDispatch()


  const login = () =>
  {

    const usernameValue = username.current.value;
    const passwordValue = password.current.value;

    localStorage.setItem("JWT",'');
    dispatch(setAuth(false))
   

    HttpClientService.login(usernameValue,passwordValue)
    .then(resp => {
      const token = resp.headers.authorization
      localStorage.setItem("JWT", token);
      dispatch(setAuth(true))
      NotificationManager.success('Successfully logged in', '');
    })
    .catch(err => {
      NotificationManager.error('Could not login, try again', 'Error!', 2000);
      dispatch(setAuth(false))
    })
  }


  return (
    <div style={{
      width: '50%',
      margin: '40px auto'
    }}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input ref={username} type="text" className="form-control" id="username" placeholder="username" />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input ref={password} type="password" className="form-control" id="password" />
      </div>

      <button  className='btn btn-primary' onClick={() => login()}>
        Login
      </button>
    </div>
  )
}
