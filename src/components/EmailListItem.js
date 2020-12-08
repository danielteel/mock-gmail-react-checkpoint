import React from 'react';
import styled from 'styled-components';
import  {
    Link,
  } from 'react-router-dom';


const StyledLink = styled(Link)`
    display: flex;
    flex-direction: row;
    border-width:1;
    border-style:solid;
    border-color: gray;
    margin: 5px;
    text-decoration: none;
    background-color: #FFFFFF;
    color: black;
    justify-content: center;
    align-items:center;
    border-radius:8px;
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
    font-size: 1.5em;
    margin-left: 10px;
    padding: 2px;
`;
const RightSide = styled.div`
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

export default function EmailListItem({email, filter}){;
    return  <StyledLink to={'/email/'+email.id}>
                <LeftSide>
                    <LeftSideSubject>{applyFilterToText(email.subject, filter)}</LeftSideSubject>
                    <LeftSideFrom>{email.sender} → {email.recipient}</LeftSideFrom>
                </LeftSide>
                <RightSide>
                    {new Date(email.date).toDateString()}
                </RightSide>
            </StyledLink>
}