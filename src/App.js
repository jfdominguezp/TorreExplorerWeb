import React, { Component } from 'react';
import PageHeader from './components/PageHeader';
import PeopleList from './components/PeopleList';
import PersonModal from './components/PersonModal';
import ExportModal from './components/ExportModal';
import _ from 'lodash';
import * as api from './api/api';
import './App.css';

class App extends Component {
    state = {
        activeBio: null,
        activeConnection: null,
        connections: [],
        connectionPath: [],
        exportEmail: '',
        loading: false,
        loadingPath: false,
        loadingExport: false,
        showModal: false,
        showExport: false
    };

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

    exportToCSV = async () => {
        if (this.state.connections) {
            this.setState({ loadingExport: true });
            const ids = this.state.connections.map(({ person: { publicId } }) => publicId);
            const data = await api.exportToCSV(ids, this.state.exportEmail);
            this.setState({ loadingExport: false });
            return data;
        }
    }

    onCardClick = (connection) => {
        this.setState({ activeConnection: connection, showModal: true });
    }

    onExportClick = () => {
        this.setState({ showExport: true });
    }

    onModalClose = () => {
        this.setState({ 
            showModal: false,
            activeConnection: null,
            connectionPath: []
        });
    }

    onExportClose = () => {
        this.setState({ 
            showExport: false, 
            exportEmail: '', 
            loadingExport: false 
        });
    }

    setLoading = (loading) => {
        this.setState({ loading });
    }

    validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
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

    renderExportModal() {
        return (
            <ExportModal
                onSubmit={this.exportToCSV}
                email={this.state.exportEmail}
                onEmailChange={(e, { value }) => this.setState({ exportEmail: value })}
                showModal={this.state.showExport}
                loading={this.state.loadingExport}
                validateEmail={this.validateEmail}
            />
        );
    }

    render() {
        return (
            <div>
                <PageHeader 
                    loading={this.state.loading}
                    setLoading={this.setLoading}
                    fetchConnections={this.fetchConnections}
                    connections={this.state.connections}
                    onExportClick={this.onExportClick}
                />
                <PeopleList 
                    connections={this.state.connections}
                    onCardClick={this.onCardClick}
                />
                { this.renderPersonModal() }
                { this.renderExportModal() }
            </div>
        );
    }
}

export default App;
