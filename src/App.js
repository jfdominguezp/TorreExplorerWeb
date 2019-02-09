import React, { Component } from 'react';
import PageHeader from './components/PageHeader';
import PeopleList from './components/PeopleList';
import * as api from './api/api';
import './App.css';

class App extends Component {
    state = {
        connections: [],
        loading: false
    };

    fetchConnections = async (bioURL) => {
        const parts = bioURL.split('https://torre.bio/');
        if (parts.length === 2) {
            const connections = await api.fetchConnections(parts[1]);
            this.setState({ connections });
        }
    }

    setLoading = (loading) => {
        this.setState({ loading });
    }

    render() {
        return (
            <div>
                <PageHeader 
                    loading={this.state.loading}
                    setLoading={this.setLoading}
                    fetchConnections={this.fetchConnections}
                    connections={this.state.connections}
                />
                <PeopleList connections={this.state.connections}/>
            </div>
        );
    }
}

export default App;
