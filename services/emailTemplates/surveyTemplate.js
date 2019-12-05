//HTML boilerplate, pull from survey.body
const keys = require('../../config/keys')

module.exports = (survey) => {
    return`
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>Your input is appreciated!</h3>
                    <p>Please answer the following question:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};