import React, { Component } from 'react';
import PageHeader from './components/PageHeader';
import PeopleList from './components/PeopleList';
import PersonModal from './components/PersonModal';
import _ from 'lodash';
import * as api from './api/api';
import './App.css';

class App extends Component {
    state = {
        activeBio: null,
        activeConnection: null,
        connections: [],
        connectionPath: [],
        loading: false,
        loadingPath: false,
        loadingExport: false,
        showModal: false,
    };

    onCardClick = (connection) => {
        this.setState({ activeConnection: connection, showModal: true });
    }

    fetchConnections = async (bioURL) => {
        const parts = bioURL.split('https://torre.bio/');
        if (parts.length === 2) {
            const connections = await api.fetchConnections(parts[1]);
            this.setState({ connections, activeBio: parts[1] });
        }
    }

    fetchConnectionPath = async (publicId) => {
        this.setState({ loadingPath: true });
        const connectionPath = await api.fetchConnectionPath(this.state.activeBio, publicId);
        this.setState({ connectionPath, loadingPath: false });
    }

    exportToCSV = async (email) => {
        if (this.state.connections) {
            const ids = this.state.connections.map(({ person: { publicId } }) => publicId);
            const data = await api.exportToCSV(ids, email);
            return data;
        }
    }

    setLoading = (loading) => {
        this.setState({ loading });
    }

    onModalClose = () => {
        this.setState({ 
            showModal: false,
            activeConnection: null,
            connectionPath: []
        });
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
                    onModalClose={this.onModalClose}
                    fetchConnectionPath={this.fetchConnectionPath}
                    connectionPath={this.state.connectionPath}
                    loadingPath={this.state.loadingPath}
                    activeBio={this.state.activeBio}
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
