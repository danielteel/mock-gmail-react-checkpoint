import React from 'react';
import styled from 'styled-components';
import  {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';

import Email from './Email';
import EmailListItem from './EmailListItem';
import Compose from './Compose';
import TopBar from './TopBar';
import NavBar from './NavBar';

const InboxContainer=styled.div`
    display: flex;
`;

const ContentContainer=styled.div`
    flex-grow:1;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    background-color: #DDDDDD;
    font-size: 2em;
    padding: 5px;
`;

export default class Inbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            emails: [],
            filter: "",
            sortByDateMultiplier:-1,
            searchEmails: [],
            searchText: ""
        }
    }

    componentDidMount = async () => {
        const response = await fetch("http://localhost:3001/emails");
        let emails = await response.json();
        this.setState({emails: emails});
    }

    newUniqueID(){
        let maxID=0;
        for (let email of this.state.emails){
            maxID=Math.max(isFinite(email.id)?email.id:0, maxID);           
        }
        return maxID+1;
    }

    sendEmail = async (to, subject, message) => {
        let newEmail={  sender: this.props.ownEmailAddress,
                        recipient: to,
                        subject: subject,
                        message: message,
                        date: (new Date()).toJSON(),
                        id: this.newUniqueID()
                     };
    
        const response = await fetch('http://localhost:3001/send',
                                        {
                                            method:"POST",
                                            body: JSON.stringify(newEmail),
                                            headers:{
                                                "Content-Type":"application/json",
                                                "Accept":"application/json"  
                                            }
                                        }
                                    )
        const didSend=await response.json();
        if (didSend.status==="success"){
            this.componentDidMount();
            return true;
        }else{
            return false;
        }
    }
    
    filterChanged = (text) => {
        this.setState({filter: text});
    }

    doSearch = async () => {
        this.setState({searchEmails: []});
        this.setState({searchText: this.state.filter});
        const response = await fetch("http://localhost:3001/search?query="+decodeURIComponent(this.state.filter));
        let searchResults = await response.json();
        searchResults.sort((a,b)=>{
            a=new Date(a.date);
            b=new Date(b.date);
            if (a>b) return this.state.sortByDateMultiplier;
            if (a<b) return -1*this.state.sortByDateMultiplier;
            return 0;
        });
        this.setState({searchEmails: searchResults});
    }

    resetFilter = () =>{
        this.setState({filter: ""});
    }

    render(){
        let searchedEmails=this.state.searchEmails;

        let filteredEmails = this.state.emails;
        if (this.state.filter.length>0){
            filteredEmails = filteredEmails.filter( (email) => email.subject.toLowerCase().includes(this.state.filter.toLowerCase()));
            searchedEmails = searchedEmails.filter( (email) => email.subject.toLowerCase().includes(this.state.filter.toLowerCase()));
        }

        filteredEmails.sort((a,b)=>{
            a=new Date(a.date);
            b=new Date(b.date);
            if (a>b) return this.state.sortByDateMultiplier;
            if (a<b) return -1*this.state.sortByDateMultiplier;
            return 0;
        });

        let inbox=filteredEmails.filter(email => email.recipient.toLowerCase().trim()===this.props.ownEmailAddress.trim().toLowerCase());
        let sentbox=filteredEmails.filter(email => email.sender.toLowerCase().trim()===this.props.ownEmailAddress.trim().toLowerCase());

        
        return (
                <Router basename="/">
                    <InboxContainer>
                    <NavBar resetFilter={this.resetFilter}/>
                    <ContentContainer>
                    <Switch>
                        <Route exact path='/'>
                            <TopBar searchOnClick={this.doSearch} filterOnChange={this.filterChanged} filterValue={this.state.filter}/>
                            <Header>Inbox</Header>
                            {
                                this.state.filter.length>0?<h2>Filtering results to: {this.state.filter}</h2>:""
                            }
                            {
                                inbox.map((email) => <EmailListItem email={email} filter={this.state.filter}/>)  
                            }
                        </Route>

                        <Route exact path='/sent'>
                            <TopBar searchOnClick={this.doSearch} filterOnChange={this.filterChanged} filterValue={this.state.filter}/>
                            <Header>Sent Items</Header>
                            {
                                this.state.filter.length>0?<h2>Filtering results to: {this.state.filter}</h2>:""
                            }
                            {
                                sentbox.map((email) => <EmailListItem email={email} filter={this.state.filter}/>)  
                            }
                        </Route>

                        <Route path='/email/:id'>
                            <Email emails={this.state.emails}/>
                        </Route>

                        <Route path='/compose/'>
                            <Compose sendEmail={this.sendEmail}/>
                        </Route>

                        <Route path='/search'>
                            <h2>Search results of: {this.state.searchText}</h2>
                            {
                                //Implemented this to make use of the api, but I like my filter thing I did up above.
                                searchedEmails.map((email) => <EmailListItem email={email} filter={this.state.filter}/>)  
                            }
                        </Route>
                    </Switch>
                    </ContentContainer>
                    </InboxContainer>
                </Router>
        );
    }
}