import React from 'react';
import styled from 'styled-components';
import  {
    Link,
    useHistory
  } from 'react-router-dom';


const TopBarContainer = styled.div`
    background-color: #cccccc;
    padding: 5px;
    display: flex;
`;

const InputStyled = styled.input`
    border-radius: 4px;
    border-width: 1px;
    outline: none;
    height: 1.5em;
    width: 30em;
    flex-grow:1;
`;

const SearchLink = styled(Link)`
    background-color: #BBBBBB;
    border-width:1;
    border-style:solid;
    margin-left: 5px;
    border-radius: 4px;
    border-width: 1px;
    outline: none;
    text-decoration: none;
    padding-left: 3px;
    padding-right: 3px;
    color: black;
    &:hover{
        background-color: #CCCCCC;
    }
    &:active{
        background-color: #AAAAAA;
    }
`;

const PlaceHolder = styled.div`flex-grow: 2;`;




export default function TopBar({searchOnClick, filterOnChange, filterValue}){
    const history = useHistory();
    const searchIt = (e) => { if (e.code==="Enter") {searchOnClick(); history.push("search");}}
    return  (   
                <TopBarContainer>
                    <PlaceHolder/>
                    <InputStyled id="filter" type="text" onChange={(e)=>filterOnChange(e.target.value)} onKeyPress={(e)=>{searchIt(e)}} value={filterValue}/>
                    <SearchLink onClick={()=>searchOnClick()} to={'search'}>Search</SearchLink>
                    <PlaceHolder/>
                </TopBarContainer>
            );
}