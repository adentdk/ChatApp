import {StyleSheet} from 'react-native';
import {color} from '../config/config'

export const GlobalStyles = StyleSheet.create({

    // container
    containerFlexStart: {
        justifyContent : 'flex-start',
        flex : 1,
        backgroundColor : color.light
    },

    containerCenter : {
        justifyContent : 'center',
        flex : 1,
        backgroundColor : color.light
    },

    inputContainerStyle : {
        borderWidth:0.7,
        backgroundColor:"rgba(0,0,0,0.07)",
        borderRadius:10,
        margin:5,
        height:40,
    },
    
    // 
    row : {
        flexDirection : "row",
        justifyContent : "center",
        padding : 3,
        margin : 5
    },

    // text
    screenTitle : {
        fontSize : 24,
        fontWeight: '900',
        color : color.dark,
        textAlign : "center"
    },
    
    textCenter : {
        textAlign : 'center'
    },
    
    textLight : {
        color : color.light
    },

    // shape
    circle : {
        height:60,
        width:60,
        borderRadius:30,
        marginHorizontal:5,
    },


    // coloring
    primary: {
        backgroundColor : color.primary
    },
    secondary: {
        backgroundColor : color.secondary
    },
    other: {
        backgroundColor : color.other
    },

    // utilities
    center : {
        alignItems : "center",
        justifyContent: "center"
    }
})