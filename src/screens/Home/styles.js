import styled from 'styled-components/native';
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  background-color: blueviolet;
`;

export const IntineraryArea = styled.View`
  position: absolute;
  left: 10px;
  right: 10px;
  top: 30px;
  background-color: #fff;
  border-radius: 5px;
  border-width: 1px;
  border-color: #e1e1e1;
`;

export const IntineraryItem = styled.TouchableHighlight.attrs({
  underlayColor:'rgba(0, 0, 0, 0.05)',
})`
  padding: 5px 15px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const IntineraryLabel = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const IntineraryTitle = styled.Text`
  font-size: 12px;
  color: #999;
  margin-left: 5px;
`;

export const IntineraryPointer = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: ${props => props.color ?? '#222'};
`;

export const IntineraryValue = styled.Text`
  font-size: 14px;
  color: #222;
`;

export const IntineraryPlaceholder = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 5px;
`;

export const RequestArea = styled.View`
  flex-direction: row;
`;

export const RequestDetail = styled.View`
  flex: 1;
  align-items: center;
`;

export const RequestTitle = styled.Text`
  font-size: 12px;
  color: #999;
`;

export const RequestValue = styled.Text`
  font-weight: bold;
  color: #222;
  font-size: 14px;
`;

export const RequestButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`;

export const RequestButton = styled(RectButton)`
  flex: 0.49;
  height: 35px;
  background-color: ${props => props.color ?? '#333'};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const RequestButtonText = styled.Text`
  color: ${props => props.color ?? '#fff'};
  font-size: 12px;
  font-weight: bold;
`;
