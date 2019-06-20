import React from 'react';
import '../css/Showreel.css';


const Showreel = ({ showreel }) => {

  return (
  <div className="showreel">

        <iframe title="showreel" frameBorder="0" allow="autoplay; fullscreen" src={showreel.vimeoLink}></iframe>

    </div>
  )
}
export default Showreel
