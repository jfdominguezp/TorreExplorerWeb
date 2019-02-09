import React, { Component } from 'react';
import { Card, Container, Responsive } from 'semantic-ui-react';
import PersonCard from './PersonCard';

export default class PeopleList extends Component {
    render() {
        return (
            <Container>
                <Responsive as={Card.Group} stackable itemsPerRow={3} minWidth={992}>
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                </Responsive>
                <Responsive as={Card.Group} stackable itemsPerRow={2} maxWidth={991}>
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                </Responsive>
            </Container>
        )
    }
}
