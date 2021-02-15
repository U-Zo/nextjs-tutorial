import DndExample from '../../components/example/drag-ui/DndExample';
import DragToDom from '../../components/example/drag-ui/DragToDom';

const DragUI = () => {
  return (
    <>
      <h1>Drag & Drop Example</h1>
      <div style={{ position: 'relative' }}>
        <DndExample />
      </div>
      <div>
        <DragToDom />
      </div>
    </>
  );
};

export default DragUI;
