import React, { Component } from 'react';
import { Button, Modal, Grid, Header, Image, Icon, Label, Segment  } from 'semantic-ui-react';
import ConnectionPath from './ConnectionPath';
import * as numeral from 'numeral';

export default class PersonModal extends Component {
    renderStrengths() {
        if (this.props.strengths.length) {
            return (
                <Grid.Column width={12} className='v-spacer'>
                    <Header>Strengths:</Header>
                    <Label.Group color='blue' size='small'>
                        {
                            this.props.strengths.map(({ code, name, weight }) => {
                                return (
                                    <Label key={code}>
                                        { name }
                                        <Label.Detail>{ numeral(weight).format('0.0a') }</Label.Detail>
                                    </Label>
                                );
                            })
                        }
                    </Label.Group>
                </Grid.Column>
            );
        }
    }

    renderOpportunities() {
        if (this.props.opportunities.length) {
            return (
                <Grid.Column width={12} className='v-spacer'>
                    <Header>Interested in:</Header>
                    <Label.Group size='small'>
                        {
                            this.props.opportunities.map(opportunity => {
                                return <Label key={opportunity}>{ opportunity }</Label>;
                            })
                        }
                    </Label.Group>
                </Grid.Column>
            );
        }
    }

    renderPath() {
        const {
            name,
            loadingPath,
            fetchConnectionPath,
            connectionPath,
            publicId,
            activeBio
        } = this.props;
        if (connectionPath && connectionPath.length) {
            return (
                <Segment>
                    <Header>Your connection path:</Header>
                    <ConnectionPath activeBio={activeBio} path={connectionPath} />
                </Segment>
            );
        }
        return (
            <Segment placeholder>
                <Header icon>
                    <Icon name='handshake outline' />
                    { `Want to know who can introduce you to ${name}?`}
                </Header>
                <Button color='teal' basic
                    loading={loadingPath} 
                    onClick={() => fetchConnectionPath(publicId)}>
                    Let's find out!
                </Button>
            </Segment>
        );
    }

    render() {
        const { 
            picture,
            publicId,
            name,
            professionalHeadline,
            weight,
            showModal,
            onModalClose,
            loadingPath
        } = this.props;
        return (
            <Modal 
                dimmer='inverted' 
                open={showModal} 
                onClose={onModalClose} 
                closeOnDimmerClick={!loadingPath}
                closeOnEscape={!loadingPath}
            >
                <Modal.Content>
                    <Grid stackable>
                        <Grid.Row columns={16}>
                            <Grid.Column width={4}>
                                <Image circular src={picture} />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Grid.Row colums={12}>
                                    <Grid.Column width={12}>
                                        <Header size='large'>
                                            <a href={`https://torre.bio/${publicId}`} target='_blank' rel='noopener noreferrer'>
                                                { name } <Icon name='external square alternate' size='mini' />
                                            </a>
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column width={12} className='v-spacer'>
                                        <span className='small-uppercase-caption'>
                                            { `${numeral(weight).format('0.0a')} reputation weight` }
                                        </span>
                                    </Grid.Column>
                                    <Grid.Column width={12} className='v-spacer'>
                                        { professionalHeadline }
                                    </Grid.Column>
                                    { this.renderOpportunities() }
                                    { this.renderStrengths() }
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={16}>
                            <Grid.Column width={16}>
                                { this.renderPath() }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
            </Modal>
        );
    }
}