import React, { Component } from 'react';
import { Card, Container, Header, Image, Responsive, Segment } from 'semantic-ui-react';
import PersonCard from './PersonCard';
import * as styles from './Styles';

export default class PeopleList extends Component {
    renderCards() {
        return this.props.connections.map(({ person }, index) => {
            return (
                <PersonCard
                    key={person.publicId}
                    image={person.picture}
                    name={person.name}
                    description={person.professionalHeadline}
                    weight={person.weight}
                    index={index}
                />
            )
        })
    }

    renderList() {
        return (
            <Container>
                <div style={{ marginBottom: '2rem' }}>
                    <Header textAlign='center' className='subheader'>
                        These are the best ranked people in your network
                    </Header>
                </div>
                <Responsive as={Card.Group} stackable itemsPerRow={3} minWidth={992}>
                    { this.renderCards() }
                </Responsive>
                <Responsive as={Card.Group} stackable itemsPerRow={2} maxWidth={991}>
                    { this.renderCards() }
                </Responsive>
            </Container>
        );
    }

    renderPlaceholder() {
        return (
            <Segment vertical textAlign='center' style={styles.bodyContainerStyle}>
                <div style={styles.placeholderContainerStyle}>
                    <Container>
                        <Image src='./torre-network.png' size='large' centered/>
                        <div className='subheader'>
                            Paste your Torre Bio URL in the text field, and hit Enter to get started
                        </div>
                    </Container>
                </div>
            </Segment>
        );
    }

    render() {
        if (this.props.connections.length) {
            return this.renderList();
        }
        return this.renderPlaceholder();
    }
}
