import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import _ from 'lodash';
import * as numeral from 'numeral';

export default class PersonCard extends Component {
    render() {
        const { name, description, image, weight, index } = this.props;
        return (
            <Card>
                <Card.Content>
                    <Image floated='left' size='mini' circular src={image} />
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>
                        { `${numeral(index + 1).format('0o')} in the rank - ${numeral(weight).format('0.0a')} reputation` }
                    </Card.Meta>
                    <Card.Description className='card-description'>
                        { _.truncate(description, { length: 90 }) }
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}
