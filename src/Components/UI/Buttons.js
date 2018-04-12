import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

import G from '../../Globals.js';


//PolyColor
const HugoButton = ({ text, onPress, color = G["primary-color"] }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.4}
            style={[hugoButtonStyles.buttonStyle, { backgroundColor: color, borderColor: color }]}
            onPress={onPress}>
            <Text style={hugoButtonStyles.textStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

const hugoButtonStyles = StyleSheet.create({
    textStyle: {
        fontSize: G.buttons["fontSize"],
        fontWeight: G.buttons["fontWeight"],
        color: G.buttons["color"],
        textAlign: G.buttons["textAlign"]
    },
    buttonStyle: {
        padding: G.buttons["padding"],
        marginLeft: G.buttons["marginLeft"],
        marginRight: G.buttons["marginRight"],
        marginTop: G.buttons["marginTop"],
        borderRadius: G.buttons["borderRadius"],
        borderWidth: G.buttons["borderWidth"],
        borderColor: G["primary-color-border"],

        //android
        elevation: 6,

        //ios
        shadowColor: G.buttons["shadowColor"],
        shadowOffset: G.buttons["shadowOffset"],
        shadowOpacity: G.buttons["shadowOpacity"],
        shadowRadius: G.buttons["shadowRadius"],
    }
});

/*HugoButton.propTypes = {
    bite: PropTypes.string,
    kekekek: PropTypes.any,
    onPress: PropTypes.any,
    text: PropTypes.string,
    color: PropTypes.string,
};*/

export default HugoButton;

//Primary
export class ButtonPrimary extends Component {
    render() {
        const { text, onPress } = this.props;
        return (
                <TouchableOpacity activeOpacity={0.4} style={primaryButtonStyles.buttonStyle} onPress={() => onPress()}>
                    <Text style={primaryButtonStyles.textStyle}>{text}</Text>
                </TouchableOpacity>
        );
    }
}
const primaryButtonStyles = StyleSheet.create({
    textStyle: {
        fontSize: G.buttons["fontSize"],
        fontWeight: G.buttons["fontWeight"],
        color: G.buttons["color"],
        textAlign: G.buttons["textAlign"]
    },
    buttonStyle: {
        padding: G.buttons["padding"],
        backgroundColor: G["primary-color"],
        marginLeft: G.buttons["marginLeft"],
        marginRight: G.buttons["marginRight"],
        marginTop: G.buttons["marginTop"],
        borderRadius: G.buttons["borderRadius"],
        borderWidth: G.buttons["borderWidth"],
        borderColor: G["primary-color-border"],

        //android
        elevation: 6,

        //ios
        shadowColor: G.buttons["shadowColor"],
        shadowOffset: G.buttons["shadowOffset"],
        shadowOpacity: G.buttons["shadowOpacity"],
        shadowRadius: G.buttons["shadowRadius"],
    }
});

//Secondary
export class ButtonSecondary extends Component {
    render() {
        const { text, onPress } = this.props;
        return (
            <TouchableOpacity activeOpacity={0.4} style={secondaryButtonStyles.buttonStyle} onPress={() => onPress()}>
                <Text style={secondaryButtonStyles.textStyle}>{text}</Text>
            </TouchableOpacity>
        );
    }
}
const secondaryButtonStyles = StyleSheet.create({
    textStyle: {
        fontSize: G.buttons["fontSize"],
        fontWeight: G.buttons["fontWeight"],
        color: G.buttons["color"],
        textAlign: G.buttons["textAlign"]
    },
    buttonStyle: {
        padding: G.buttons["padding"],
        backgroundColor: G["secondary-color"],
        marginLeft: G.buttons["marginLeft"],
        marginRight: G.buttons["marginRight"],
        marginTop: G.buttons["marginTop"],
        borderRadius: G.buttons["borderRadius"],
        borderWidth: G.buttons["borderWidth"],
        borderColor: G["secondary-color-border"],

        //android
        elevation: 6,

        //ios
        shadowColor: G.buttons["shadowColor"],
        shadowOffset: G.buttons["shadowOffset"],
        shadowOpacity: G.buttons["shadowOpacity"],
        shadowRadius: G.buttons["shadowRadius"],
    }
});

//Danger
export class ButtonDanger extends Component {
    render() {
        const { text, onPress } = this.props;
        return (
            <TouchableOpacity activeOpacity={0.4} style={dangerButtonStyles.buttonStyle} onPress={() => onPress()}>
                <Text style={dangerButtonStyles.textStyle}>{text}</Text>
            </TouchableOpacity>
        );
    }
}
const dangerButtonStyles = StyleSheet.create({
    textStyle: {
        fontSize: G.buttons["fontSize"],
        fontWeight: G.buttons["fontWeight"],
        color: G.buttons["color"],
        textAlign: G.buttons["textAlign"]
    },
    buttonStyle: {
        padding: G.buttons["padding"],
        backgroundColor: G.buttons["danger"],
        marginLeft: G.buttons["marginLeft"],
        marginRight: G.buttons["marginRight"],
        marginTop: G.buttons["marginTop"],
        borderRadius: G.buttons["borderRadius"],
        borderWidth: G.buttons["borderWidth"],
        borderColor: G.buttons["danger-border"],

        //android
        elevation: 6,

        //ios
        shadowColor: G.buttons["shadowColor"],
        shadowOffset: G.buttons["shadowOffset"],
        shadowOpacity: G.buttons["shadowOpacity"],
        shadowRadius: G.buttons["shadowRadius"],
    }
});

//Warning
export class ButtonWarning extends Component {
    render() {
        const { text, onPress } = this.props;
        return (
            <TouchableOpacity activeOpacity={0.4} style={warningButtonStyles.buttonStyle} onPress={() => onPress()}>
                <Text style={warningButtonStyles.textStyle}>{text}</Text>
            </TouchableOpacity>
        );
    }
}
const warningButtonStyles = StyleSheet.create({
    textStyle: {
        fontSize: G.buttons["fontSize"],
        fontWeight: G.buttons["fontWeight"],
        color: G.buttons["color"],
        textAlign: G.buttons["textAlign"]
    },
    buttonStyle: {
        padding: G.buttons["padding"],
        backgroundColor: G.buttons["warning"],
        marginLeft: G.buttons["marginLeft"],
        marginRight: G.buttons["marginRight"],
        marginTop: G.buttons["marginTop"],
        borderRadius: G.buttons["borderRadius"],
        borderWidth: G.buttons["borderWidth"],
        borderColor: G.buttons["warning-border"],

        //android
        elevation: 6,

        //ios
        shadowColor: G.buttons["shadowColor"],
        shadowOffset: G.buttons["shadowOffset"],
        shadowOpacity: G.buttons["shadowOpacity"],
        shadowRadius: G.buttons["shadowRadius"],
    }
});

//Success
export class ButtonSuccess extends Component {
    render() {
        const { text, onPress } = this.props;
        return (
            <TouchableOpacity activeOpacity={0.4} style={successButtonStyles.buttonStyle} onPress={() => onPress()}>
                <Text style={successButtonStyles.textStyle}>{text}</Text>
            </TouchableOpacity>
        );
    }
}
const successButtonStyles = StyleSheet.create({
    textStyle: {
        fontSize: G.buttons["fontSize"],
        fontWeight: G.buttons["fontWeight"],
        color: G.buttons["color"],
        textAlign: G.buttons["textAlign"]
    },
    buttonStyle: {
        padding: G.buttons["padding"],
        backgroundColor: G.buttons["success"],
        marginLeft: G.buttons["marginLeft"],
        marginRight: G.buttons["marginRight"],
        marginTop: G.buttons["marginTop"],
        borderRadius: G.buttons["borderRadius"],
        borderWidth: G.buttons["borderWidth"],
        borderColor: G.buttons["success-border"],

        //android
        elevation: 6,

        //ios
        shadowColor: G.buttons["shadowColor"],
        shadowOffset: G.buttons["shadowOffset"],
        shadowOpacity: G.buttons["shadowOpacity"],
        shadowRadius: G.buttons["shadowRadius"],
    }
});
