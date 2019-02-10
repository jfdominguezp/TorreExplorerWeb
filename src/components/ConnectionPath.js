import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';

export default ({ path, activeBio }) => {
    const renderFeedEvents = (path) => {
        const steps = [];
        for (let i = 0; i < path.length; i++) {
            const current = path[i];
            let content;
            if (i === 0) {
                content = `<strong><a href='https://torre.bio/${activeBio}'>You</a></strong> know <strong><a href='https://torre.bio/${current.publicId}'>${current.name}</a></strong>`
            } else {
                const prev = path[i - 1];
                content = `<strong><a href='https://torre.bio/${prev.publicId}'>${prev.name}</a></strong> knows <strong><a href='https://torre.bio/${current.publicId}'>${current.name}</a></strong>`
            }

            steps.push(
                <Feed.Event>
                    { 
                        current.picture && (
                            <Feed.Label>
                                <img alt='current.publicId' src={current.picture} />
                            </Feed.Label>
                        )
                    }
                    { 
                        !current.picture && (
                            <Feed.Label>
                                <Icon name='user' circular inverted color='teal'  />
                            </Feed.Label>
                        )
                    }
                    <Feed.Content>
                        <span dangerouslySetInnerHTML={ { __html: content } }/>
                    </Feed.Content>
                </Feed.Event>
            );
        }
        return steps;
    }
    return (
        <Feed size='large'>
            { renderFeedEvents(path) }
        </Feed>
    );
}