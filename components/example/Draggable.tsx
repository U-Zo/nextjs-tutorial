import { ReactElement } from 'react';
import styled from 'styled-components';

const DraggableBlock = styled.div`
  width: 100px;
  height: 100px;
  border: 2px dotted #000;
`;

const Draggable = (): ReactElement => {
  return <DraggableBlock></DraggableBlock>;
};

export default Draggable;
