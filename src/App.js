import React, { Component } from 'react';
import PageHeader from './components/PageHeader';
import PeopleList from './components/PeopleList';
import PersonModal from './components/PersonModal';
import _ from 'lodash';
import * as api from './api/api';
import './App.css';

class App extends Component {
    state = {
        activeConnection: null,
        connections: [],
        loading: false,
        showModal: false,
    };

    onCardClick = (connection) => {
        this.setState({ activeConnection: connection, showModal: true });
    }

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

    renderPersonModal() {
        if (this.state.activeConnection) {
            const {
                person,
                strengths,
                opportunities
            } = this.state.activeConnection;
            const sortedStengths = strengths
                .sort((a, b) => b.weight - a.weight)
                .slice(0, 7);
            const activeOpportunities = opportunities
                .filter(({ active }) => active)
                .map(({ name }) => _.capitalize(name));
            return (
                <PersonModal
                    publicId={person.publicId}
                    name={person.name}
                    picture={person.picture}
                    professionalHeadline={person.professionalHeadline}
                    weight={person.weight}
                    strengths={sortedStengths}
                    opportunities={activeOpportunities}
                    showModal={this.state.showModal}
                />
            );
        }
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
                <PeopleList 
                    connections={this.state.connections}
                    onCardClick={this.onCardClick}
                />
                { this.renderPersonModal() }
            </div>
        );
    }
}

export default App;
