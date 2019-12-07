import React, { Component } from 'react';
//reduxForm needed to communicate with Store, similar to connect
import { reduxForm, Field } from 'redux-form';

class SurveyForm extends Component {
    //handleSubmit provided by reduxForm after being wired up
    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    <Field 
                        type="text"
                        name="surveyTitle"
                        component="input"
                    />
                    <button type="submit" >Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);