import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

export default class PersonCard extends Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Image floated='left' size='mini' circular src='https://starrgate.s3.amazonaws.com/users/12337548ee85eeb37ad312a9645b881a8aa24325/profile_1ea6Eh7.jpg' />
                    <Card.Header>Alexander Torrenegra</Card.Header>
                    <Card.Meta>1st place</Card.Meta>
                    <Card.Description>
                    Steve wants to add you to the group <strong>best friends</strong>
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}
