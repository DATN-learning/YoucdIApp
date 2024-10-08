//import liraries
import React, {FC} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import ItemClass from './ItemClass';
import LottieView from 'lottie-react-native';
import {IListClassSectionProps} from './type';
import {GIFJSON} from '../../utils/constant';
import {useDispatch} from 'react-redux';
import {chooseClassRoom, chooseSubject} from '../../redux/classRoom/actions';
const ClassSectionContainer = styled.View`
  width: 100%;
  padding: 0px 0px 20px 0px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Header = styled.View`
  width: 100%;
  align-items: center;
  padding: 10px 0px;
`;

// create a component
const ListClassSection: FC<IListClassSectionProps> = props => {
  const {data} = props;
  const dispatch = useDispatch();
  const handleChooseClass = React.useCallback((classNumber: number) => {
    dispatch(chooseClassRoom(classNumber));
    dispatch(
      chooseSubject({
        id: '',
        name: '',
        id_relation: 0,
      }),
    );
    props.setIsShowPopupClass(false);
  }, []);

  const renderListClass = React.useCallback(() => {
    return data.map((item, index) => {
      return <ItemClass key={index} class={item} onPress={handleChooseClass} />;
    });
  }, []);

  return (
    <ScrollView>
      <Header>
        <LottieView
          source={GIFJSON.Studying}
          autoPlay
          loop
          speed={1.2}
          style={{width: '100%', height: 150}}
        />
      </Header>
      <ClassSectionContainer>{renderListClass()}</ClassSectionContainer>
    </ScrollView>
  );
};

//make this component available to the app
export default ListClassSection;
