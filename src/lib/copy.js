import React from 'react';

const Copy = (props) => {
    const onCopy = () => {
        navigator.clipboard.writeText(props.copy)
            .then(() => {
                // Получилось!
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    }
    return (
        <button className={`copy ${props.class ? props.class : null}`} onClick={onCopy} title="Copy">
            <div className="svg sidebar__img" dangerouslySetInnerHTML={{ __html: require('assets/img/copy.svg') }}></div>
        </button>
    )
}

export default Copy;