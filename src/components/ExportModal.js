import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class ExportModal extends Component {
    render() {
        const { email, loading,  onEmailChange, onSubmit, validateEmail } = this.props;
        return (
            <Form>
                <Modal 
                    dimmer='inverted' 
                    open={this.props.showModal} 
                    closeOnDimmerClick={!loading} 
                    closeOnEscape={!loading}
                    size='tiny'
                >
                    <Modal.Header>Export connections</Modal.Header>
                    <Modal.Content>
                        <p>We'll send you the exported data. Please, leave your email in the field below. You need to provide a valid email to activate the export action.</p>
                        <Form.Input
                            className='modal-input'
                            placeholder='you@email.com' 
                            value={email} 
                            onChange={onEmailChange} 
                            size='huge'
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button type='submit' 
                            loading={loading} 
                            disabled={loading || !validateEmail(email)} 
                            primary
                            onClick={onSubmit}
                        >
                            Export to CSV
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Form>
        )
    }
}