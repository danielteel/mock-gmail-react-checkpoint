import React from 'react';
import styled from 'styled-components';
import  {
    Redirect,
  } from 'react-router-dom';


const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    background-color: #FEFDFE;
    padding: 10px;
`;

const InputContainer = styled.div`
    display:flex;
    background-color: #CDCDCD;
    border-width: 1px;
    border-color: #999999;
    border-radius: 4px;
    border-style: solid;
    margin: 3px;
`;

const MessageContainer = styled.div`
    display:flex;
    flex-direction: row;
    background-color: #CDCDCD;
    border-width: 1px;
    border-color: #999999;
    border-radius: 4px;
    border-style: solid;
    margin: 3px;
`;

const LabelStyled = styled.label`
    width: 4em;
    margin:3px;
`;

const InputStyled = styled.input`
    margin: 3px;
    flex-grow:1;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    outline-style: none;
`;

const TextAreaStyled = styled.textarea`
    margin: 3px;
    flex-grow:1;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    outline-style: none;
    height:20em;
`;

const SendButton = styled.button`
    height: 2em;
    background-color: #CDCDCD;
    border-width:1;
    border-style:solid;
    border-radius: 4px;
    border-width: 1px;
    outline: none;
    text-decoration: none;
    color: black;
    &:hover{
        background-color: #CCCCCC;
    }
    &:active{
        background-color: #AAAAAA;
    }
`;

const Header = styled.div`
    background-color: #DDDDDD;
    font-size: 2em;
`;

export default class Compose extends React.Component{
    constructor(props){
        super(props);
        this.state= {
                        sent: false,
                        needToReturn: false,
                        failedToSend: false,
                    };
    }

    submitForm = (event) => {
        event.preventDefault();
        let sentSuccess=this.props.sendEmail(event.target.to.value, event.target.subject.value, event.target.message.value);
        if (sentSuccess){
            this.setState({sent: true});
        }else{
            this.setState({failedToSend: true});
        }
    }
    render(){
        if (this.state.sent && this.state.needToReturn===false){
            setTimeout(()=>{this.setState({needToReturn: true})},1000)
            return  <div>
                        <h1>Message sent!</h1>
                    </div>
        }else if (this.state.needToReturn){
            return <Redirect to='/'/>
        }else{
            return  <div>
                        <Header>Send a new email</Header>
                        {this.state.failedToSend?<h1>Failed to send!</h1>:""}
                        <FormStyled onSubmit={(e)=>{this.submitForm(e)}}>
                            <InputContainer>
                                <LabelStyled>To: </LabelStyled>
                                <InputStyled id="to" type="email"/>
                            </InputContainer>
                            
                            <InputContainer>
                                <LabelStyled>Subject: </LabelStyled>
                                <InputStyled id="subject" type="text"/>
                            </InputContainer>
                            <MessageContainer>
                            <LabelStyled>Message: </LabelStyled>
                            <TextAreaStyled id="message"/>
                            </MessageContainer>
                            <SendButton>Send</SendButton>
                        </FormStyled>
                    </div>
        }
    }

}