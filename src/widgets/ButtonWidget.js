import React from 'react'

export default function ButtonWidget(props) {
    const [count, setCount] = React.useState(0)
    return (
        <div className='foo'>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>+</button>
        </div>
    );
}