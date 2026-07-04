import { useState } from 'react';

const Clicker = () => {
    const [data, setData] = useState(0);

    const handleClick = () => {
        setData(data+1);
    }

    return (
        <div className="flex p-4">
          <button 
            className="
              border 
              border-1 
              p-2 
              rounded 
              hover:cursor-pointers
              active:bg-green-100
              " 
              onClick={handleClick}>
              Click me!
          </button>
          <p className="flex p-2">{data}</p>
        </div>
    );
}

export default Clicker;