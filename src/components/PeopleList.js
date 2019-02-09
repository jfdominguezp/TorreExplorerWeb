import React, { Component } from 'react';
import { Card, Container } from 'semantic-ui-react';
import PersonCard from './PersonCard';

export default class PeopleList extends Component {
    render() {
        return (
            <Container>
                <Card.Group stackable itemsPerRow={3}>
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                </Card.Group>
            </Container>
        )
    }
}
