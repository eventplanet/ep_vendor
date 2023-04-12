import React, { useState } from 'react';
import Select from 'react-select'
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];
const MyComponent = () => {

    const [djPolicy, setDjPolicy] = useState([])
    console.log('State', djPolicy)

    const changeHandler = (e) => {
        setDjPolicy(e)
    }
    return (
        < Select
            closeMenuOnSelect={false}
            isMulti
            options={options}
            selected
            onChange={changeHandler}
        />
    )
}
export default MyComponent