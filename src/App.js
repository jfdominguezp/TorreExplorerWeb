import React, { Component } from 'react';
import PageHeader from './components/PageHeader';
import PeopleList from './components/PeopleList';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <PageHeader />
                <PeopleList />
            </div>
        );
    }
}

export default App;
