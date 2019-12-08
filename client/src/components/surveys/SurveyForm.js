import React, { Component } from 'react';
//reduxForm needed to communicate with Store, similar to connect
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

//will be used to iterate through to generate SurveyFields
const FIELDS = [
    {label: 'Survey Title', name: 'title'},
    {label: 'Subject Line', name: 'subject'},
    {label: 'Email Body', name: 'body'},
    {label: 'Recipient List', name: 'emails'}
];

class SurveyForm extends Component {
    //helper to render all SurveyFields
    //any custom prop added to Field will be forwarded to component
    renderFields(){
        return FIELDS.map(({name, label}) => 
            <Field
                key={name}
                label={label}
                type="text"
                name={name}
                component={SurveyField}
            />
        );
    }

    //handleSubmit provided by reduxForm after being wired up
    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit" >
                        Next
                        <i className="material-icons right" >done</i>
                    </button>
                </form>
            </div>
        );
    }
}

//values is an object that has a key of name (from FIELDS) and value of whatever was typed in
//need to return an object, if empty form is valid; if error has a property that matches one of the SurveyFields properties (ie name of title), it will pass on to that Field
function validate(values) {
    const errors = {};

    errors.emails = validateEmails(values.emails || '');
    FIELDS.forEach(({name}) => {
        if(!values[name]){
            errors[name] = 'You must provide a value';
        }
    });

    return errors;
}

//will define validate to pass to reduxForm so it's automatically ran ever time form is submitted
export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);