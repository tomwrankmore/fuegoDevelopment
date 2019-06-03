import React from 'react';
import '../css/Showreel.css';


const Showreel = ({ showreel }) => {



  return (
  <div className="showreel">

        <iframe muted autoplay frameborder="0" allow="autoplay; fullscreen" allowfullscreen src={showreel.vimeoLink}></iframe>

    </div>
  )
}
export default Showreel
