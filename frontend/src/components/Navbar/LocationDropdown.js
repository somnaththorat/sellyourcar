import React from 'react';
import Select from 'react-select';
import { Dropdown } from 'semantic-ui-react'


const district = [
    { label: 'Ahmednagar', value: 'Ahmednagar' },
    { label: 'Akola', value: 'Akola' },
    { label: 'Amravati', value: 'Amravati' },
    { label: 'Aurangabad	', value: 'Aurangabad	' },
    { label: 'Beed', value: 'Beed' },
    { label: 'Bhandara', value: 'Bhandara' },
    { label: 'Buldhana', value: 'Buldhana' },
    { label: 'Chandrapur', value: 'Chandrapur' },
    { label: 'Dhule', value: 'Dhule' },
    { label: 'Gadchiroli', value: 'Gadchiroli' },
    { label: 'Gondia	', value: 'Gondia	' },
    { label: 'Hingoli', value: 'Hingoli' },
    { label: 'Jalgaon', value: 'Jalgaon' },
    { label: 'Jalna', value: 'Jalna' },
    { label: 'Kolhapur', value: 'Kolhapur' },
    { label: 'Latur', value: 'Latur' },
    { label: 'Mumbai City', value: 'Mumbai City' },
    { label: 'Mumbai Suburban', value: 'Mumbai Suburban' },
    { label: 'Nagpur', value: 'Nagpur' },
    { label: 'Nanded', value: 'Nanded' },
    { label: 'Nandurbar', value: 'Nandurbar' },
    { label: 'Nashik', value: 'Nashik' },
    { label: 'Osmanabad', value: 'Osmanabad' },
    { label: 'Palghar', value: 'Palghar' },
    { label: 'Parbhani', value: 'Parbhani' },
    { label: 'Pune', value: 'Pune' },
    { label: 'Raigad', value: 'Raigad' },
    { label: 'Ratnagiri', value: 'Ratnagiri' },
    { label: 'Sangli', value: 'Sangli' },
    { label: 'Satara', value: 'Satara' },
    { label: 'Sindhudurg', value: 'Sindhudurg' },
    { label: 'Solapur', value: 'Solapur' },
    { label: 'Thane', value: 'Thane' },
    { label: 'Wardha', value: 'Wardha' },
    { label: 'Washim', value: 'Washim' },
    { label: 'Yavatmal', value: 'Yavatmal' }
]
const LocationDropdown = () => {

    return (
        <>
            <select options={district} className="searchbar"  placeholder ="City" />
            {/* <div>
                <Dropdown placeholder='Select Country' options={district} />
            </div> */}

        </>
    )
}

export default LocationDropdown;
