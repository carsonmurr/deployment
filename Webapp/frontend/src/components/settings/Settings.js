import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import UserSettings from './UserSettings';
import NotificationSettings from './NotificationSettings';
import AccountSettings from './AccountSettings';
import PrivacyPolicy from './PrivacyPolicy';
import HelpAndSupport from './HelpAndSupport';
import AboutUs from './AboutUs';

class Settings extends Component {
    // Component props
    static propTypes = {
        auth: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
    };
    
    // Initialize component state
    constructor(props) {
        super(props);
        this.state = {
            showNotificationSettings: false,
            showAccountSettings: false,
            showPrivacyPolicy: false,
            showHelpAndSupport: false,
            showAboutUs: false,
        };
    }

    // Lifecycle method to load user data when the component mounts
    componentDidMount() {
        this.props.loadUser();
    }

    // Below are functions to toggle the visibility of Notification Settings and Account Settings
    toggleNotificationSettings = () => {
        this.setState({
            showNotificationSettings: true,
            showAccountSettings: false,
            showPrivacyPolicy: false,
            showHelpAndSupport: false,
            showAboutUs: false,
        });
    };

    toggleAccountSettings = () => {
        this.setState({
            showAccountSettings: true,
            showNotificationSettings: false,
            showPrivacyPolicy: false,
            showHelpAndSupport: false,
            showAboutUs: false,
        });
    };

    togglePrivacyPolicy = () => {
        this.setState({
            showAccountSettings: false,
            showNotificationSettings: false,
            showPrivacyPolicy: true,
            showHelpAndSupport: false,
            showAboutUs: false,
        });
    };
    
    toggleHelpAndSupport = () => {
        this.setState({
            showAccountSettings: false,
            showNotificationSettings: false,
            showPrivacyPolicy: false,
            showHelpAndSupport: true,
            showAboutUs: false,
        });
    };
    
    toggleAboutUs = () => {
        this.setState({
            showAccountSettings: false,
            showNotificationSettings: false,
            showPrivacyPolicy: false,
            showHelpAndSupport: false,
            showAboutUs: true,
        });
    };

    // Function to go back and reset the visibility of Notification and Account Settings
    goBack = () => {
        this.setState({
            showNotificationSettings: false,
            showAccountSettings: false,
            showPrivacyPolicy: false,
            showHelpAndSupport: false,
            showAboutUs: false,
        });
    };

    render() {
        const { user } = this.props.auth;

        return (
            <div>
                <h1 style={{ textAlign: 'center' }} className="mb-4">
                    Settings
                </h1>
                {/* Using a Fragment to group multiple elements without introducing an additional DOM element */}
                <Fragment>
                    <div>
                        {/* Conditional rendering based on the state to show different settings components */}
                        {(!this.state.showNotificationSettings && !this.state.showAccountSettings
                            && !this.state.showPrivacyPolicy && !this.state.showHelpAndSupport && !this.state.showAboutUs) && (
                            <Fragment>
                                {/* UserSettings component with buttons to toggle between Account and Notification Settings */}
                                <UserSettings
                                    toggleAccountSettings={this.toggleAccountSettings}
                                    toggleNotificationSettings={this.toggleNotificationSettings}
                                    togglePrivacyPolicy={this.togglePrivacyPolicy}
                                    toggleHelpAndSupport={this.toggleHelpAndSupport}
                                    toggleAboutUs={this.toggleAboutUs}
                                />
                            </Fragment>
                        )}
                        {/* If either state is true, render the particular settings */}
                        {this.state.showAccountSettings && <AccountSettings goBack={this.goBack} />}
                        {this.state.showNotificationSettings && <NotificationSettings goBack={this.goBack} />}
                        {this.state.showPrivacyPolicy && <PrivacyPolicy goBack={this.goBack} />}
                        {this.state.showHelpAndSupport && <HelpAndSupport goBack={this.goBack} />}
                        {this.state.showAboutUs && <AboutUs goBack={this.goBack} />}
                    </div>
                </Fragment>
            </div>
        );
    }
}
// Mapping the 'auth' state from the Redux store to the component's props
const mapStateToProps = (state) => ({
    auth: state.auth,
});
// Connecting the component to the Redux store and mapping the loadUser action
export default connect(mapStateToProps, { loadUser })(Settings);
