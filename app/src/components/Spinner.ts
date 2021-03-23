import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    
    to {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
    display: inline-block;
    width: 30px;
    height: 30px;

    &:after {
        content: " ";
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 4px solid #000;
        border-color: #000 transparent #000 transparent;
        animation: ${rotate} 1.2s linear infinite;
    }
`;

export default Spinner;
