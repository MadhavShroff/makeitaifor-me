import React, { useEffect, useState } from 'react';
import { DndContext, DragMoveEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { KeyboardSensor, PointerSensor } from '@dnd-kit/core';
import { useSensor, useSensors } from '@dnd-kit/core';
import Navbar from '@/components/Navbar';
import FileUploadComponent from '@/components/documents/FileUploadComponent';
import { fetchDocs, fetchUser } from '@/utils/fetches';
import { ScrollableStackContainer, ScrollableBoxContainer } from '@/components/documents/Stacks';
import Button from '@/components/Button';
import Img from 'next/image';
import Footer from '@/components/Footer';
import LoginPage from '../auth';
import { ChatComponent } from '@/components/documents/ChatComponent';

const Documents = () => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState({ // Mock user
    id: "91231123-1230u1u-123132",
    name: "John Doe",
    username: "john@doe.com"
  });
  const [docs, setDocs] = useState<string[]>([]); 

  const pointerSensorOptions = {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  };
  
  const sensors = useSensors(
    useSensor(PointerSensor, pointerSensorOptions),
    useSensor(KeyboardSensor),
  );

  useEffect(() => {
    // fetchUser(setUser);
  }, []);
    
  useEffect(() => {
    // if (user) {
    //   fetchDocs(user)
    //     .then(setDocs)
    //     .catch((error) => {
    //       console.log("error: ", error);
    //     });
    // }
    // setDocs(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
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
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Navbar user={user} />
        { user && <div className=''>
            <ScrollableStackContainer />
            <ChatComponent />
          </div>}
        { user == null &&
         <LoginPage />
        }
        
        <Footer />
      </DndContext>
    </main>
  );
};

export default Documents;
