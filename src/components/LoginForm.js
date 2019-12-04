import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { renderField } from '../form';
import { connect } from "react-redux";
import { userLoginAttempt } from "../actions/actions";

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchProps = {
    userLoginAttempt
};

class LoginForm extends React.Component {

    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token) {
            console.log(this.props);
            console.log(prevProps);
            this.props.history.push('/');
        }
    }

    onSubmit(values) {
        console.log(values);
        return this.props.userLoginAttempt(
            values.username,
            values.password
        )
    }


    render() {
        console.log(this.props);
        const { handleSubmit } = this.props;
        return (
            <div className="text-center">
                <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="username" label="Username" type="text" component={renderField} />
                    <Field name="password" label="Password" type="password" component={renderField} />
                    <button type="submit" className="btn btn-primary btn-big btn-block "> Log in  </button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'LoginForm '
})(connect(mapStateToProps, mapDispatchProps)(LoginForm));