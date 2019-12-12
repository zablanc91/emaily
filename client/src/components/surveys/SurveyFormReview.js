import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

//destructure props
const SurveyFormReview = ({onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = formFields.map(({label, name}) => {
        return( 
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });
    return(
        <div>
            <h5>Please confirm your entries.</h5>
            {reviewFields}
            <button 
                className="yellow darken-3 btn-flat white-text"
                onClick={onCancel}
            >
                Back
            </button>
            <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues, history)}>
                SUBMIT
                <i className="material-icons right">
                    email
                </i>
            </button>
        </div>
    );
};

//state.form.surveyForm.values contains all SurveyField inputs
function mapStateToProps(state ){
    return {
        formValues: state.form.surveyForm.values
    };
}

//wrap our SurveyFormReview component with withRouter for history, in props
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));