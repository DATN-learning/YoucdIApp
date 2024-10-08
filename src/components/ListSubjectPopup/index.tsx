//import liraries
import React, {FC} from 'react';
import {ScrollView, Text} from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import {GIFJSON} from '../../utils/constant';
import {useDispatch} from 'react-redux';
import {IListSubjectectionProps} from './type';
import ItemSubject, {
  ItemContent,
  ItemSubjectContainer,
  SubjectTitle,
} from './ItemSubject';
import {chooseSubject} from '../../redux/classRoom/actions';
const SubjectSectionContainer = styled.View`
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
const ListSubjectPopup: FC<IListSubjectectionProps> = props => {
  const {data, isBtnChooseAll} = props;
  const dispatch = useDispatch();

  const handleChooseSubject = React.useCallback(
    (id: string, id_relation: number, name: string) => {
      dispatch(
        chooseSubject({
          id: id,
          id_relation: id_relation,
          name: name,
        }),
      );
      props.setIsShowPopupSubject(false);
    },
    [],
  );

  const handleChooseAllSubject = React.useCallback(() => {
    dispatch(
      chooseSubject({
        id: '',
        id_relation: 0,
        name: 'Tất cả môn',
      }),
    );
    props.setIsShowPopupSubject(false);
  }, []);

  const renderListSubject = React.useCallback(() => {
    return data.map((item, index) => {
      return (
        <ItemSubject key={index} subject={item} onPress={handleChooseSubject} />
      );
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
      <SubjectSectionContainer>
        {renderListSubject()}
        {isBtnChooseAll && (
          <ItemSubjectContainer>
            <ItemContent onPress={handleChooseAllSubject}>
              <SubjectTitle>{'Tất cả môn'}</SubjectTitle>
            </ItemContent>
          </ItemSubjectContainer>
        )}
      </SubjectSectionContainer>
    </ScrollView>
  );
};

//make this component available to the app
export default ListSubjectPopup;
