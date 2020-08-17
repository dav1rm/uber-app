import styled from 'styled-components/native';

export const Content = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
`;

export const ModalClose = styled.TouchableHighlight.attrs({
  underlayColor:'rgba(0, 0, 0, 0.05)',
})`
  height: 35px;
  width: 35px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const ModalCloseText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  line-height: 22px;
  color: #777;
`;

export const ModalInput = styled.TextInput`
  flex: 1;
  margin-left: 10px;
  color: #222;
  font-size: 14px;
`;

export const ModalResults = styled.ScrollView`

`;

export const ModalResult = styled.TouchableHighlight.attrs({
  underlayColor:'rgba(0, 0, 0, 0.05)',
})`
  padding: 10px 15px;
  /* border-bottom-width: 1px;
  border-bottom-color: #e2e2e2; */

`;

export const ModalResultText = styled.Text`
  color: #111;
  font-size: 14px;
`;
