import { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DragStart,
  DragUpdate,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

const DraggableItem = ({ i, name }: { i: number; name: string }) => {
  return (
    <Draggable key={name} draggableId={name} index={i}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {name}
        </li>
      )}
    </Draggable>
  );
};

const DndExample = () => {
  const items = [
    {
      name: 'aaa',
    },
    {
      name: 'bbb',
    },
    {
      name: 'ccc',
    },
  ];

  const [dragItems, setDragItems] = useState(items);
  const queryAttr = 'data-rbd-drag-handle-draggable-id';
  const [placeholderProps, setPlaceholderProps] = useState({});

  const handleOnDragEnd = (result: DropResult) => {
    const _items = Array.from(dragItems);
    const [reorderedItem] = _items.splice(result.source.index, 1);

    if (!result.destination) {
      return;
    }
    _items.splice(result.destination.index, 0, reorderedItem);

    setDragItems(_items);
  };

  const getDraggedDom = (draggableId: string) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  const handleDragStart = (event: DragStart) => {
    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM || !draggedDOM.parentElement) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;

    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentElement).paddingTop) +
      [...draggedDOM.parentElement.children]
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentElement).paddingLeft,
      ),
    });
  };

  const handleDragUpdate = (event: DragUpdate) => {
    if (!event.destination) {
      return;
    }

    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM || !draggedDOM.parentElement) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...draggedDOM.parentElement.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentElement).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentElement).paddingLeft,
      ),
    });
  };

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
    >
      <Droppable droppableId="ui">
        {(provided, snapshot) => (
          <ul
            className="ui"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {dragItems.map((item, i) => (
              <DraggableItem name={item.name} key={`${i}-${item.name}`} i={i} />
            ))}
            {provided.placeholder}
            {snapshot.isDraggingOver && (
              <div
                className="placeholder"
                style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  borderRadius: '3px',
                  border: 'dashed 1px blue',
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  width: placeholderProps.clientWidth,
                }}
              />
            )}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DndExample;
