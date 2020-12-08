import React from 'react';
import styled from 'styled-components';
import  {
    useParams,
    useHistory,
  } from 'react-router-dom';


const Header = styled.div`
    background-color: #FaFaFa;
    font-size: 2em;
    padding: 5px;
`;

const Subject = styled.div`
  background-color: #FaFaFa;
  font-size: 1.25em;
  padding: 5px;
  text-align: left;
`;

const From = styled.div`
  background-color: #FaFaFa;
  font-size: 1.25em;
  padding: 5px;
  text-align: left;
`;

const Message = styled.div`
  background-color: #FaFaFa;
  font-size: 1em;
  padding: 5px;
  text-align: left;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
`;
const DetailsContainer = styled.div`
  background-color: #FaFaFa;
  font-size: 1em;
  padding: 5px;
  text-align: left;
  display:flex;
  align-items: center;
  margin: 0px;
  padding: 0px;
`;
const FromAndSubject = styled.div`
  background-color: #FaFaFa;
  font-size: 1em;
  padding: 5px;
  text-align: left;
  flex-grow:1;
`;
const DateDisplay = styled.div`
  background-color: #FaFaFa;
  font-size: 1em;
  padding: 5px;
  text-align: left;
`;

const EmailContainer = styled.div`
  background-color: #FaFaFa;
  padding: 5px;
`;
export default function Email({emails}){
    const history=useHistory();

    let {id} = useParams();
    let thisEmail = emails.find((email) => email.id===Number(id));
    if (!thisEmail){
        return <Header>Email doesnt exist!</Header>
    }


    return  <EmailContainer>
                <Header>Message Details</Header>
                <DetailsContainer>
                    <FromAndSubject>
                        <From><b>From:</b> {thisEmail.sender}</From>
                        <From><b>To:</b> {thisEmail.recipient}</From>
                        <Subject><b>Subject:</b> {thisEmail.subject}</Subject>
                    </FromAndSubject>
                    <DateDisplay>
                        {(new Date(thisEmail.date)).toDateString()}
                    </DateDisplay>
                </DetailsContainer>
                <Message><b>Message:</b><br/>{thisEmail.message}</Message>
                <button onClick={()=>history.goBack()}>Go Back</button>
            </EmailContainer>
}