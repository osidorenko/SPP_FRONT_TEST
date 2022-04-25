import React, {useState} from 'react';

const Counter = () => {
    const [state, setState] = useState(0)

    function add() {
        setState(state + 1)
    }

    function del() {
        setState(state - 1)
    }

    return (
        <div>
            <h1>{state}</h1>
            <button onClick={add}> countAdd</button>
            <button onClick={del}> countDel</button>
        </div>
    );
};

export default Counter;