import React, { useEffect, useState } from 'react'
import './withSplashScreen.css';

function loading(){
  return (
    <div className='splashScreen'>
      <div className='daruma'>
        <div className='daruma__face'>
          <div className='daruma__eye'></div>
          <div className='daruma__eye active'></div>
          <div className='daruma__mustache'></div>
          <div className='daruma__nose'></div>
          <div className='daruma__eyebrow'></div>
        </div>
        <div className='daruma__chin'>
          <div className='daruma__chin_mark'></div>
          <div className='daruma__chin_mark'></div>
          <div className='daruma__chin_mark'></div>
          <div className='daruma__chin_mark'></div>
          <div className='daruma__chin_mark'></div>
          <div className='daruma__chin_mark'></div>
        </div>
      </div>
      <div className='daruma_shadow'></div>
    </div>
  )
}

const withSplashScreen = (WrappedComponent) => (props) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => {
      setShow(true);
    }, 3000)

    return () => {
      clearInterval(id);
    }
  }, [])

  if(!show) return loading();

  return <WrappedComponent {...props} />
}

export default withSplashScreen;