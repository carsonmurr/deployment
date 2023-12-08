import React from 'react';

const PrivacyPolicy = ({goBack}) => {
    return (
        <div>
            <h2>Privacy Policy</h2>
            <p><b>Last updated: September 28, 2023</b></p>
            <p>This privacy notice for Logic Terrors ("<b>we</b>," "<b>us</b>," or "<b>our</b>"),
            describes how and why we might collect, store, use, and/or share ("<b>process</b>")
            your information when you use our services ("<b>Services</b>"), such as when you:</p>
            <ul>
                <li>
                    Visit our website at http://workplacewise.com, or any website of ours that links
                    to this privacy notice
                </li>
                <li>
                    Download and use our mobile application (WorkplaceWise), or any other application of
                    ours that links to this privacy notice
                </li>
                <li>
                    Engage with us in other related ways, including any sales, marketing or events
                </li>
            </ul>
            <p><b>Questions or concerns?</b> Reading this privacy notice will help you understand your
            privacy rights and choices. If you do not agree with our policies and practices, please
            do not use our Services. If you still have any questions or concerns, please contact us
            at Support@workplacewise.com.</p>
            <h3>SUMMARY OF KEY POINTS</h3>
            <button onClick={goBack}>Back</button>
        </div>
    );
};

export default PrivacyPolicy;