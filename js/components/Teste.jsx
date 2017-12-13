import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';


class Teste extends React.Component {
    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired
        })
    };

    render() {
        return (
            <div >
                vazio
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        loggedUser
    } = state;

    return {
        loggedUser
    };
};

export default connect(mapStateToProps)(Teste);
