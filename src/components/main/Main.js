import React, { Component } from 'react';
import { Button, Container, Header, Input, Menu, Segment } from 'semantic-ui-react';
import * as styles from './Main.styles';

export default class Main extends Component {
    render() {
        return (
            <Segment vertical textAlign='center' style={styles.headerStyle}>
                <Container>
                    <Menu secondary>
                        <Menu.Item>
                            <span style={styles.logoStyle}>torre</span>
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <Button inverted>
                                Export connections
                            </Button>
                        </Menu.Item>
                    </Menu>
                    <div style={styles.headerContentStyle}>
                        <Header inverted>
                            <span style={styles.titleStyle}>
                                Find the most influential people in your Torre network
                            </span>
                        </Header>
                        <Input type='text' placeholder='https://torre.bio/your-bio' className='header-input'/>
                    </div>
                </Container>
            </Segment>
        )
    }
}
