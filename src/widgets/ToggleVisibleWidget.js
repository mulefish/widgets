import React from 'react'

const ToggleVisibleWidget = () => {
    const [show, setShow] = React.useState(true)
    const message = <div>This is a message</div>
    return (
        <div>
        <button onClick={()=>setShow(!show)}>Toggle</button>
        { show && message} 
        </div>
    );
}
export default ToggleVisibleWidget