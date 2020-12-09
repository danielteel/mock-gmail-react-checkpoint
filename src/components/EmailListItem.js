import React from 'react';
import styled from 'styled-components';
import  {
    Link,
  } from 'react-router-dom';


const StyledLink = styled(Link)`
    display: flex;
    flex-direction: row;
    border-width:1px;
    border-style:solid;
    border-color: gray;
    margin: 3px;
    text-decoration: none;
    background-color: #FFFFFF;
    color: black;
    justify-content: center;
    align-items:center;
    border-radius:8px;

    &:hover {
        background-color: #EEEEEE;
    }
    &:active {
        background-color: #CCCCEE;
    }
`;

const LeftSide = styled.div`
    display: flex;
    flex-grow:1;
    flex-direction: column;
`;
const LeftSideFrom = styled.div`
    align-self: flex-start;
    margin-left: 10px;
    padding: 2px;
    font-size: 1em;
`;
const LeftSideSubject = styled.div`
    align-self: flex-start;
    font-size: 1.25em;
    font-weight: 500;
    margin-left: 10px;
    padding: 2px;
`;
const RightSide = styled.div`
    margin: 10px;
`;

const FilterSpan = styled.span`color:red;`;

function applyFilterToText(text, filter){
    if (filter.length===0) return text;
    filter=filter.toLowerCase();

    let returnVal=[];
    let workingString="";

    for (let i=0;i<text.length;i++){
        if (text.substr(i, filter.length).toLowerCase()===filter){
            returnVal.push(workingString);
            returnVal.push(<FilterSpan className="hilightFilter">{text.substr(i, filter.length)}</FilterSpan>);
            workingString="";
            i+=filter.length-1;
        }else{
            workingString+=text[i];
        }
    }

    returnVal.push(workingString);
    return returnVal;
}

export default function EmailListItem({email, filter, ourEmailAddress}){
    let sender = (ourEmailAddress.toLowerCase().trim() === email.sender.toLowerCase().trim()) ? "me": email.sender;
    let reciever = (ourEmailAddress.toLowerCase().trim() === email.recipient.toLowerCase().trim()) ? "me": email.recipient;
    return  <StyledLink to={'/email/'+email.id}>
                <LeftSide>
                    <LeftSideSubject>{applyFilterToText(email.subject, filter)}</LeftSideSubject>
                    <LeftSideFrom>{sender} → {reciever}</LeftSideFrom>
                </LeftSide>
                <RightSide>
                    {new Date(email.date).toDateString()}
                </RightSide>
            </StyledLink>
}