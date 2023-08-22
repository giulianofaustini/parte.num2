import React from "react";
import '../index.css';


const Message = ({infoMessage}) => {
    if (!infoMessage) {
        return null
      }
    
      return (
        <div className='infoMessage'>
          {infoMessage}
        </div>
      )
    
}

export default Message