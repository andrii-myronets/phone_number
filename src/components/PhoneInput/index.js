import React, { useState, useEffect } from 'react';
import { Box, Input, MenuItem, Select, styled, Typography } from '@material-ui/core';
import axios from 'axios';
import Flag from 'react-world-flags'
import InputMask from 'react-input-mask';
import { findFlag } from '../../utils/findFlag';
import countryData from '../../data/countryData.json';

export const PhoneInput = () => {
      
    const [selectValue, setSelectValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const selectHandler = (event) => {
        setSelectValue(event.target.value);
        setInputValue(event.target.value)
    }
    const inputHandler = (event) => {
       
        if (event.target.value.length < 5) {
            setSelectValue(`+${event.target.value}`);
        }
        setInputValue(event.target.value)
    }

    useEffect(() => {
        axios.get('https://ipapi.co/json/')
            .then(res => {
                setSelectValue(res.data.country_calling_code)
                setInputValue(res.data.country_calling_code)
            })
            .catch(e => console.log(e));
    }, []);

    return (
        <SltyledBox>
            <Select
                value={selectValue}
                onChange={selectHandler}
                renderValue={(value) =>{
                    const flagCode = findFlag(value);
                    return flagCode ? <Flag code={flagCode} height={16} /> : <Flag code="foo" fallback={<UnknowFlag>?</UnknowFlag>} />
                }                
                }
            >
                {countryData && countryData.map((item, index) =>
                    <MenuItem key={index} value={item.dialCode}>
                        <Flag code={item.isoCode} height={16} />
                        <Typography color='textPrimary' style={{ padding: '0 10px 0 10px' }}>{item.name}</Typography>
                        <Typography color='textSecondary'>{item.dialCode}</Typography>
                    </MenuItem>)}
            </Select>
            <InputMask mask='999999999999' maskChar={''} value={inputValue} onChange={inputHandler}>
                {(inputProps) => <Input {...inputProps} startAdornment={'+'}/>}
            </InputMask>
        </SltyledBox>
    )

}

const UnknowFlag = styled(Box)({
    width: '25px',
    textAlign: 'center',
    border: '1px solid black',
    backgroundColor: '#f7f7f7',
    fontSize: '20px'
});

const SltyledBox = styled(Box)({
    border:'1px solid grey',
    borderRadius:'5px',
    padding:'5px'
})