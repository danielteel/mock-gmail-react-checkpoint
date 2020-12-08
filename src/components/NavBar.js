import React from 'react';
import styled from 'styled-components';
import  {
    Link,
  } from 'react-router-dom';

const FlexBoxRow = styled.div`
    display:flex; 
    flex-direction:column;
    background-color: #DDDDDD;
`;

const StyledLink = styled(Link)`
    background-color: #CCCCCC;
    text-decoration: none;
    color: darkblue;
    padding: 10px;
    margin: 5px;
    border-color: #0000BB;
    border-width: 1px;
    border-radius: 3px;
    border-style: solid;
`;


export default function NavBar({resetFilter}){
    return  (   
                <FlexBoxRow>
                    <StyledLink to='/compose' onClick={()=>{resetFilter()}}>Compose</StyledLink>
                    <StyledLink to='/' onClick={()=>{resetFilter()}}>Inbox</StyledLink>
                    <StyledLink to='/sent' onClick={()=>{resetFilter()}}>Sent</StyledLink>
                </FlexBoxRow>
            );
}