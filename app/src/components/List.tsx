import React from "react";

import styled from "styled-components";

const ListWrapper = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Item = styled.div`
    padding: 10px 20px;
    border-radius: 10px;
    color: #333;
    cursor: default;
    transition: all 0.1s;
  
    :hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
  
    & + & {
        margin-top: 5px;
    }
`;

interface IListProps {
    locations: TLocations;
}

const List: React.FC<IListProps> = ({ locations }) => (
    <ListWrapper>
        {locations.map(location => (
            <Item key={location}>{location}</Item>
        ))}
    </ListWrapper>
);

export default List;
