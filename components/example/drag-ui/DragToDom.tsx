import { MouseEvent, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const DragToDomBlock = styled.div`
  cursor: pointer;
  border: 2px dotted black;
  padding: 1rem;
`;

const DragToDom = () => {
  const domRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    const newElement = <div>새로운 엘리먼트</div>;

    document.append(newElement);

    const target = domRef.current;
    if (!target) {
      return;
    }

    const moveAt = (pageX: number, pageY: number) => {
      target.style.left = pageX - target.offsetWidth / 2 + 'px';
      target.style.top = pageY - target.offsetHeight / 2 + 'px';
    };

    moveAt(e.pageX, e.pageY);

    const onMouseMove = (e: globalThis.MouseEvent) => {
      moveAt(e.pageX, e.pageY);
    };

    document.addEventListener('mousemove', onMouseMove);

    target.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      target.onmouseup = null;
    };

    target.ondragstart = () => {
      return false;
    };
  };

  return (
    <DragToDomBlock onMouseDown={onMouseDown} ref={domRef}>
      drag to dom example
    </DragToDomBlock>
  );
};

export default DragToDom;
