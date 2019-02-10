import React, { Component } from 'react';
import { Button, Container, Form, Header, Input, Menu, Segment } from 'semantic-ui-react';
import * as styles from './Styles';

export default class PageHeader extends Component {

    state = {
        bio: ''
    }

    onChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    onSubmit = async () => {
        this.props.setLoading(true);
        await this.props.fetchConnections(this.state.bio);
        this.props.setLoading(false);
    }

    renderExportButton() {
        if (this.props.connections.length) {
            return (
                <Menu.Item position='right'>
                    <Button inverted onClick={this.props.onExportClick}>
                        Export connections
                    </Button>
                </Menu.Item>
            );
        }
    }

    render() {
        return (
            <Segment vertical textAlign='center' style={styles.headerStyle}>
                <Container>
                    <Menu secondary>
                        <Menu.Item>
                            <span style={styles.logoStyle}>torre</span>
                        </Menu.Item>
                        { this.renderExportButton() }
                    </Menu>
                    <div style={styles.headerContentStyle}>
                        <Header inverted>
                            <div style={styles.titleStyle}>
                                Looking for opportunities? Find the most influential people in your Torre network
                            </div>
                        </Header>
                        <div style={{ marginTop: '2rem' }}>
                            <Form onSubmit={this.onSubmit}>
                                <Input 
                                    name='bio' 
                                    type='text' 
                                    placeholder='https://torre.bio/your-bio' 
                                    className='header-input'
                                    onChange={this.onChange}
                                    value={this.state.bio}
                                    disabled={this.props.loading}
                                    loading={this.props.loading}
                                />
                            </Form>
                        </div>
                    </div>
                </Container>
            </Segment>
        )
    }
}
