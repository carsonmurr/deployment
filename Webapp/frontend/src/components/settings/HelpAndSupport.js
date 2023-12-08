import React from 'react';

const HelpAndSupport = ({goBack}) => {
    return (
        <div>
            <h2>Help & Support</h2>
            <h3>Need help? Contact us:</h3>
            <h4>Email: Support@WorkplaceWise.com</h4>
            <h4>Phone: (803)-123-4567</h4>
            <button onClick={goBack}>Back</button>
        </div>
    );
};

export default HelpAndSupport;