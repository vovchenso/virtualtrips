import React from "react";

import {Layout} from "src/components";
import styled from "styled-components";

const InputWrapper = styled.div``;

const Label = styled.label`
    font-size: 14px;
`;

const StyledInput = styled.input`
    padding: 7px 12px;
    border-radius: 5px;
    border: 1px solid #aaa;
    width: 350px;
    font-size: 16px;
    color: #333;
    transition: all 0.3s linear;

    :hover {
        border-color: #777;
    }

    :focus {
        outline: 0;
        border-color: #333;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
    }
`;

interface IInputProps {
    label?: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

const Input: React.FC<IInputProps> = ({ label, placeholder, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e.target.value);
    };

    return (
        <InputWrapper>
            <Label>{label}</Label>
            <StyledInput placeholder={placeholder} onChange={handleChange} />
        </InputWrapper>
    );
};

export default Input;
