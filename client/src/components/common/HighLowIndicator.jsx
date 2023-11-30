import { useState, useEffect } from "react";

const HighLowIndicator = ({ currentPrice, high, low }) => {
    const [green, setGreen] = useState();
  
    useEffect(() => {
      let total = high - low;
      let greenZone = ((high - currentPrice) * 100) / total;
      setGreen(Math.ceil(greenZone));
    }, [currentPrice, high, low]);
  
    return (
        <>
      <div className="progress" style={{ width: "24rem", height: '8px', borderRadius: '10px' }}>
        <div
          className="progress-bar bg-danger rounded-start"
          style={{ width: `${100 - green}%`, borderRadius: '10px 0 0 10px' }}
        ></div>
        <div
          className="progress-bar bg-success rounded-end"
          style={{ width: `${green}%`, borderRadius: '0 10px 10px 0' }}
        ></div>
      </div>
    </>
  );
};

  export default HighLowIndicator;
