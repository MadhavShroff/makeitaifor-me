import React, { useEffect, useState } from 'react';
import { DndContext, DragMoveEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { KeyboardSensor, PointerSensor } from '@dnd-kit/core';
import { useSensor, useSensors } from '@dnd-kit/core';
import Navbar from '@/components/Navbar';
import FileUploadComponent from '@/components/documents/FileUploadComponent';
import { fetchDocs, fetchUser } from '@/utils/fetches';
import { ScrollableStackContainer, ScrollableBoxContainer } from '@/components/Stacks';
import Button from '@/components/Button';
import Img from 'next/image';
import Footer from '@/components/Footer';

const Documents = () => {
  const [user, setUser] = useState(null);
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

  let pageContent;
  if (!user) pageContent =
    <section className="flex p-10 bg-black text-white dark:text-white flex-col items-center">
        <div className="w-96 flex flex-col flex-auto justify-center items-center">
            <div className="mb-5">
                <Img
                    src={"/logo_nobg.png"}
                    alt="Logo"
                    width={1000}
                    height={1000}
                    className="md:w-500 md:h-500"
                />
            </div>
            <div className="mb-2 text-center">Welcome to MakeIt<span className="text-orange-500">Ai</span>For.<span className="text-orange-500">Me</span></div>
            <div className="mb-4 text-center">
                Log in with your account to continue
            </div>
            <div className="flex flex-row gap-3">
                <Button _key={1} href={"https://api.makeitaifor.me/auth/cognito"} text='Login' />
                <Button _key={1} href='/auth/signup' text='Sign Up' />
            </div>
        </div>
        <div className="py-3 text-xs">
            <a href="https://openai.com/policies/terms-of-use" target="_blank" className="mx-3 text-gray-500" rel="noreferrer">Terms of use</a>
            <span className="text-gray-600">|</span>
            <a href="https://openai.com/policies/privacy-policy" target="_blank" className="mx-3 text-gray-500" rel="noreferrer">Privacy policy</a>
        </div>
    </section>
  else pageContent = "Hi"

  return (
    <main className={'flex flex-col'}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Navbar user={user} />
        <ScrollableStackContainer />
        <ScrollableBoxContainer titles={docs} />
        <FileUploadComponent />
        <Footer />
      </DndContext>
    </main>
  );
};

export default Documents;
