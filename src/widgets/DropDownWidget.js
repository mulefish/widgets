import React from 'react'

const someData = [
    { k: "a", v: "chicken" },
    { k: "b", v: "duck" },
    { k: "c", v: "goose" },
    { k: "d", v: "grouse" },
    { k: "e", v: "crow" },
    { k: "f", v: "finch" },
    { k: "g", v: "wren" },
    { k: "h", v: "swift" },
    { k: "i", v: "bewick" },
    { k: "j", v: "hen" }
];


const DropDownWidget = () => {

    const [theSelected, setTheSelected] = React.useState()
    const [theOptions, setTheOptions] = React.useState(someData)
    const aryOfOptions = theOptions.map((d) => <option key={d.k} value={d.k}>{d.v}</option>);




    return (
    <div>

        Single select example
        <br></br>
        
        <select onChange={(e)=>setTheSelected( Array.from(e.target.selectedOptions, option => <ul key={option.value}>{option.text}</ul>) )}>
            {aryOfOptions}
        </select>

        <br></br>
        The selected bird
        <br></br>
        <ul>
        {theSelected}
        </ul>            
    </div>
    )
}
export default DropDownWidget