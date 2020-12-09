import React from 'react';
import styled from 'styled-components';
import  {
    Link,
  } from 'react-router-dom';

const FlexyBox = styled.div`
    display:flex; 
    flex-direction:column;
    background-color: #EEEEEE;
    border-right-style: dashed;
    border-width: 1px;
    border-color: #999999;
`;

const ComposeLink = styled(Link)`
    background-color: #CCCCCC;
    text-decoration: none;
    color: black;
    padding: 10px;
    margin: 5px;
    margin-bottom:20px;
    border-color: black;
    border-width: 1px;
    border-radius: 3px;
    border-style: solid;

    &:hover{
        background-color: #DDDDDD;
    }
    &:active{
        background-color: #EEEEEE;
    }
`;

const StyledLink = styled(Link)`
    background-color: #CCCCCC;
    text-decoration: none;
    color: black;
    padding: 5px;
    margin: 5px;
    border-color: black;
    border-width: 1px;
    border-radius: 3px;
    border-style: solid;

    &:hover{
        background-color: #DDDDDD;
    }
    &:active{
        background-color: #EEEEEE;
    }
`;


export default function NavBar({resetFilter}){
    return  (   
                <FlexyBox>
                    <ComposeLink to='/compose' onClick={()=>{resetFilter()}}>Compose</ComposeLink>
                    <StyledLink to='/' onClick={()=>{resetFilter()}}>Inbox</StyledLink>
                    <StyledLink to='/sent' onClick={()=>{resetFilter()}}>Sent</StyledLink>
                </FlexyBox>
            );
}