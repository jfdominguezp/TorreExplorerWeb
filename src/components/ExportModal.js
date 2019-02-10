import React, { Component } from 'react';
import { Modal, Form } from 'semantic-ui-react';

export default class ExportModal extends Component {
    render() {
        const { email, loading,  onEmailChange, onSubmit, validateEmail } = this.props;
        return (
                <Modal 
                    dimmer='inverted' 
                    open={this.props.showModal} 
                    size='tiny'
                >
                    <Modal.Header>Export connections</Modal.Header>
                    <Modal.Content>
                        <p>We'll send you the exported data. Please, leave your email in the field below. You need to provide a valid email to activate the export action.</p>
                        <Form onSubmit={onSubmit}>
                            <Form.Input
                                className='modal-input'
                                placeholder='you@email.com' 
                                value={email} 
                                onChange={onEmailChange} 
                                size='huge'
                            />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Form.Button 
                            type='submit' 
                            loading={loading} 
                            disabled={loading || !validateEmail(email)} 
                            primary
                        >
                            Export to CSV
                        </Form.Button>
                    </Modal.Actions>
                </Modal>
        )
    }
}