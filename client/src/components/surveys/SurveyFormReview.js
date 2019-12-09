import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

//destructure props
const SurveyFormReview = ({onCancel, formValues}) => {
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
                className="yellow darken-3 btn-flat"
                onClick={onCancel}
            >
                Back
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

export default connect(mapStateToProps)(SurveyFormReview);