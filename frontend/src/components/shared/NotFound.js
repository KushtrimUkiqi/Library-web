import React from 'react';

//images
import image from '../../images/notFound.gif';

export default function NotFound({title,message}) {
  return (
    <div className="alert" role="alert" style={{width: '50%',minHeight: '75vh',display: 'flex',justifyContent: 'center',alignItems: 'center',margin: 'auto'}}>
        <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column',height: '40vh',width: '60vh'}}>
            <h5>
                <strong>{title}</strong> 
                <br/>
                {message}
            </h5>
        <img src={image} width="250px" height="250px" />
        </div>
    </div>
  )
}
