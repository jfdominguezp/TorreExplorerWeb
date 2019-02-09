import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import _ from 'lodash';
import * as numeral from 'numeral';

export default class PersonCard extends Component {
    getNumberWithOrdinal(n) {
        var s=["th","st","nd","rd"],
        v=n%100;
        return n+(s[(v-20)%10]||s[v]||s[0]);
    }

    render() {
        const { name, description, image, weight, index } = this.props;
        return (
            <Card>
                <Card.Content>
                    <Image floated='left' size='mini' circular src={image} />
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>
                        { `${this.getNumberWithOrdinal(index + 1)} in the rank - ${numeral(weight).format('0.0a')} reputation` }
                    </Card.Meta>
                    <Card.Description className='card-description'>
                        { _.truncate(description, { length: 90 }) }
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}
