import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable' + props.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

export default Draggable;
