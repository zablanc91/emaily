//SurveyNew will render SurveyForm and SurveyReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends Component {
    //state init with create react app, SurveyForm is shown by default
    state = {showFormReview: false};

    renderContent(){
        if(this.state.showFormReview){
            return <SurveyFormReview onCancel={() => this.setState({showFormReview: false})} />;
        }
        return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})} />;
    }

    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

//needed to clear out SurveyForm values after unmounting this Component
//onUnmountDestroy is true by default
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);