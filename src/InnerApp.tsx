import { View, Text, StatusBar } from 'react-native'
import React,{FC} from 'react'
import RootStack from './routes/RootStack'

const InnerApp:FC = () => {
  return (
    <>
        <StatusBar showHideTransition="slide" barStyle={'light-content'} />
        <RootStack/>
    </>
  )
}

export default InnerApp