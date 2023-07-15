import React, { useEffect, useState } from 'react';
import { DndContext, DragMoveEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { KeyboardSensor, PointerSensor } from '@dnd-kit/core';
import { useSensor, useSensors } from '@dnd-kit/core';
import Navbar from '@/components/Navbar';
import FileUploadComponent from '@/components/documents/FileUploadComponent';
import { fetchDocs, fetchUser } from '@/utils/fetches';
import { ScrollableStackContainer, ScrollableBoxContainer } from '@/components/Stacks';

const Documents = () => {
  const [user, setUser] = useState(null);
  const [docs, setDocs] = useState<string[]>([]); 

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  useEffect(() => {
    fetchUser(setUser);
  }, []);
    
  useEffect(() => {
    // if (user) {
    //   fetchDocs(user)
    //     .then(setDocs)
    //     .catch((error) => {
    //       console.log("error: ", error);
    //     });
    // }
    setDocs(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
  }, [user]);

  const handleDragStart = (event: DragStartEvent) => {
    console.log(`Drag started: ${event.active.id}`);
  }

  const handleDragMove = (event: DragMoveEvent) => {
    console.log(`Drag moved: ${event.active.id}`);
  }

  const handleDragOver = (event: DragOverEvent) => {
    console.log(`Drag over: ${event.active.id}`);
  }

  const handleDragEnd = (event) => {
    // Dragged-from id is active.id
    console.log(`Dragged from: ${event.active.id}`);

    // Dragged-to id is over.id. It can be null if the item was not dragged over a droppable area.
    if (event.over) {
        console.log(`Dragged to: ${event.over.id}`);
    } else {
        console.log('The item was not dragged over a droppable area');
    }
  }

  return (
    <main className={'flex flex-col'}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Navbar user={user} />
        <ScrollableStackContainer />
        <ScrollableBoxContainer titles={docs} />
        <FileUploadComponent />
      </DndContext>
    </main>
  );
};

export default Documents;
