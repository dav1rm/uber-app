import styled from 'styled-components/native';
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.SafeAreaView`
  height: 150px;
  background-color: #3574cb;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  margin-left: 20px;
  color: #fff;
  font-size: 27px;
`;

export const TabContainer = styled.View`
  background-color: #3574cb;
  flex-direction: row;
  padding: 0 5px;
`;

export const TabItem = styled.TouchableHighlight.attrs({
  underlayColor:'#2f6abd',
})`
  padding: 10px 20px;
  border-bottom-width: 3px;
  border-bottom-color: ${props => props.selected? '#fff' : '#3574cb'};
`;

export const TabTitle = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const Form = styled.KeyboardAvoidingView`
  margin-top: 20px;
  padding: 0px 20px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999'
})`
  height: 50px;
  margin-bottom: 15px;
  background-color: white;
  font-size: 16px;
  color: #333;
  border-bottom-width: 2px;
  border-bottom-color: #ccc;
`;


export const Button = styled(RectButton)`
  height: 50px;
  margin-top: 10px;
  background-color: ${props => props.enabled === false ? '#e6e6e6' : '#3574cb'};
  font-size: 16px;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
`;

export const ButtonTitle = styled.Text`
  color: ${props => props.enabled === false ? '#B1B0B0' : '#fff'};
  font-weight: bold;
  font-size: 16px;
`;

export const LoadingArea = styled.View`
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;
