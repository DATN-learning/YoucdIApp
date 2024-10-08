import { View, Text } from 'react-native'
import React,{FunctionComponent} from 'react'
import styled from 'styled-components/native'

const SearchFormContainer = styled.View``;

import { SearchFormProps } from './type'
const SearchForm:FunctionComponent<SearchFormProps> = (props) => {
  return (
    <SearchFormContainer>
      <Text>SearchForm</Text>
    </SearchFormContainer>
  )
}

export default SearchForm