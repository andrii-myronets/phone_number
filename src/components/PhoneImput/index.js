import React, { useState, useEffect } from 'react';
import { Box, Input, MenuItem, Select, styled, Typography } from '@material-ui/core';
import axios from 'axios';
import Flag from 'react-world-flags'
import InputMask from 'react-input-mask';
import { findFlag } from '../../utils/findFlag';


export const PhoneInput = () => {

    const [selects, setSelects] = useState([]);
    const [selectValue, setSelectValue] = useState({});
    const [inputValue, setInputValue] = useState('');

    const selectHeandler = (event) => {
        setSelectValue(event.target.value);
        setInputValue(event.target.value.dialCode)
    }
    const inputHeandler = (event) => {
        if (event.target.value.split(' ').join('').length < 5) {
            setSelectValue(findFlag(event.target.value.split(' ').join(''), selects))
        }
        setInputValue(event.target.value)
    }

    useEffect(() => {
        axios.get('countryData.json')
            .then(res => setSelects(res.data))
            .catch(e => console.log(e));
            
        axios.get('https://ipapi.co/json/')
            .then(res => {
                setSelectValue({
                    "name": res.data.country_name,
                    "dialCode": res.data.country_calling_code,
                    "isoCode": res.data.country_code
                })
                setInputValue(res.data.country_calling_code)
            })
            .catch(e => console.log(e));
    }, []);

    return (
        <SltyledBox>
            <Select
                value={selectValue}
                onChange={selectHeandler}
                renderValue={(value) =>
                    value.isoCode ? <Flag code={value.isoCode} height={16} /> : <Flag code="foo" fallback={<UnknowFlag>?</UnknowFlag>} />
                }
            >
                {selects && selects.map((item, index) =>
                    <MenuItem key={index} value={item}>
                        <Flag code={item.isoCode} height={16} />
                        <Typography color='textPrimary' style={{ padding: '0 10px 0 10px' }}>{item.name}</Typography>
                        <Typography color='textSecondary'>{item.dialCode}</Typography>
                    </MenuItem>)}
            </Select>
            <InputMask mask='99 999 999 99 99' maskChar={''} value={inputValue} onChange={inputHeandler}>
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