import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: blueviolet;
`;

export const IntineraryArea = styled.View`
  position: absolute;
  left: 10px;
  right: 10px;
  top: 40px;
  background-color: #fff;
  border-radius: 5px;
  border-width: 1px;
  border-color: #e1e1e1;
`;

export const IntineraryItem = styled.TouchableHighlight.attrs({
  underlayColor:'#999',
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
  background-color: ${props => props.color ?? '#000'};
`;

export const IntineraryValue = styled.Text`
  font-size: 16px;
  color: #111;
`;

export const IntineraryPlaceholder = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 5px;
`;
