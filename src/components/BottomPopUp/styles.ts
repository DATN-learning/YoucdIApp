
import { Platform,Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bottomPopupModalContainer:{
        flex:1,
        justifyContent:'flex-end',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    iconMinus:{
        width:20,
        height:20,
    },
    renderContainer:{
        width:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:'white',
    },
    titleContainer:{
        width:'100%',
        alignItems:'center',
        marginBottom:10,
        borderBottomWidth:0.5,
        paddingVertical:5,
        borderBottomColor:'rgba(0,0,0,0.1)',
    },
    title:{
        fontSize:25,
        fontFamily:'VarelaRound-Regular',
    },
    menuAvatar:{
        width:'100%',
        padding:10,
        
    }
});

export default styles;
