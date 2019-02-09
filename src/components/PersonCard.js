import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import _ from 'lodash';


export default class PersonCard extends Component {
    render() {
        const { name, description, image, weight } = this.props;
        return (
            <Card>
                <Card.Content>
                    <Image floated='left' size='mini' circular src={image} />
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta></Card.Meta>
                    <Card.Description className='card-description'>
                        { _.truncate(description, { length: 90 }) }
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}
