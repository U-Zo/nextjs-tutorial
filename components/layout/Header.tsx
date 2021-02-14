import styled from 'styled-components';

import Responsive from './Responsive';

const HeaderBlock = styled.div`
  position: sticky;
  top: 0;
  height: 80px;
`;

const Header = () => {
  return (
    <HeaderBlock>
      <Responsive>aaaa</Responsive>
    </HeaderBlock>
  );
};

export default Header;
