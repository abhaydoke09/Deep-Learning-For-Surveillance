import React from 'react';

const Legend = () => {
  const name = "dog";
  const color = "green";
  return(
    <div>

    <div className="row legendRow">
    <div className="legendBox" style={{ background: color}}></div> <p>{name}</p>
    </div>


    </div>
  );
}

export default Legend;
