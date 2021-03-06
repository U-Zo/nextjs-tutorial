import { ReactNode } from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    width: 1024px;
  }

  @media (max-width: 1024px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

interface ResponsiveProps {
  children?: ReactNode;
  rest?: unknown;
}

const Responsive = ({ children, ...rest }: ResponsiveProps) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
