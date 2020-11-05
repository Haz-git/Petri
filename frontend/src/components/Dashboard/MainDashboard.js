import React, { Component } from 'react';
import { getJWT } from '../../utils/jwthelper';
import styled from 'styled-components';

//Main Dashboard Components:
import MDTodo from './MDTodo';
import MDSciNews from './MDSciNews';

//Styles:
const MainDashboardContainer = styled.div`
    height: 100vh;
    background-color: white;
`
const MainDashboardHeaderContainer = styled.div`
    padding-top: 20px;
    text-align: center;
    background-color: lightblue;
`
const MainDashboardHeader = styled.h1`
    margin: 0;
`
const MainDashboardHeader2 = styled.h2`
    padding-top: 10px;
    margin: 0;
`

const MainDashboardUpperGrid = styled.div`
    background-color: pink;
    padding: 20px 20px;
    display: grid;
    grid-template-columns: 50% 50%;
`

const UpperGridContainer = styled.div`
    text-align: center;
`

class MainDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const userDetails = getJWT();

        const { firstName, lastName, userName, email } = userDetails.data;

        this.setState({
            firstName,
            lastName,
            userName,
            email,
        });

        console.log(getJWT());
    }

    render() {

        const { firstName, lastName, userName, email } = this.state;

        return (
            <MainDashboardContainer>
                <MainDashboardHeaderContainer>
                    <MainDashboardHeader>Welcome back {firstName}! </MainDashboardHeader>
                    <MainDashboardHeader2>You are currently signed in under {email}</MainDashboardHeader2>
                </MainDashboardHeaderContainer>
                <MainDashboardUpperGrid>
                    <UpperGridContainer>
                        <MDTodo />
                    </UpperGridContainer>
                    <UpperGridContainer>
                        <MDSciNews />
                    </UpperGridContainer>
                </MainDashboardUpperGrid>
            </MainDashboardContainer>
        )
    }
}

export default MainDashboard;