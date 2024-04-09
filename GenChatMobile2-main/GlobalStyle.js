import { StyleSheet, useWindowDimensions } from 'react-native';

export default function GlobalStyle() {
    const layout = useWindowDimensions();

    let margin = 120;
    let gap = 30;

    if (layout.width < layout.height) {
        margin = 40;
        gap = 20;
    }

    let backgroundColor = '#ffffff';
    let borderColor = '#121212';
    let fontColor = '#121212';

    if (0 == 1) {
        backgroundColor = '#121212';
        borderColor = '#ffffff';
        fontColor = '#ffffff';
    }

    return StyleSheet.create({
        // General
        marginSide: {
            marginLeft: margin,
            marginRight: margin,
        }, 
        bolder: {
            fontWeight: 'bolder'
        }, 
        fontColor: {
            color: fontColor
        }, 
        flexGrow1: {
            flexGrow: 1
        }, 

        // All pages
        container: {
            paddingTop: margin, 
            paddingBottom: margin, 
            flex: 1,
            justifyContent: 'center',
            gap: gap,
            backgroundColor: backgroundColor, 
        },
        flex1: {
            flex: 1
        }, 
        coverImageWrapper: {
            flex: 1
        }, 
        coverImage: {
            flex: 1,
            aspectRatio: 1 / 1
        }, 
        logo: {
            width: 40,
            aspectRatio: 1 / 1
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold'
        },
        inputComponent: {
            gap: 10,
            alignSelf: 'stretch',
            justifyContent: 'center'
        },
        flexRow: {
            flexDirection: 'row'
        }, 
        input: {
            padding: 8,
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: 10
        }, 
        btnSubmitWrapper: {
            alignSelf: 'stretch',
            alignItems: 'center',
            backgroundColor: 'blue',
            borderRadius: 10,
        },
        btnSubmit: {
            color: '#ffffff',
            fontSize: 20,
            fontWeight: 'bold',
            padding: 10,
        },

        // SignIn
        hyperlinkComponent: {
            alignSelf: 'stretch',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        underline: {
            textDecorationLine: 'underline'
        },
        continueWrapper: {
            flexDirection: 'row',
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'space-between'
        }, 
        line: {
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
            width: "25%",
        },
        btnGoogleWrapper: {
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#eeeeee',
            borderRadius: 10,
            borderColor: borderColor,
            // borderWidth: 1
        },
        btnGoogle: {
            color: '#121212',
            fontSize: 20,
            fontWeight: 'bold',
            padding: 10,
        }, 
        googleIcon: {
            height: 30, 
            width: 30, 
        }, 

        // OTP
        twoLogoWrapper: {
            flexDirection: 'row', 
            justifyContent: 'space-between',
        }, 

        // Sign Up
        error: {
            color: 'red'
        }, 
        success: {
            color: 'green'
        }
    });
}