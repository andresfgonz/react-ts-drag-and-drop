import React, { createContext, useState } from 'react';

type ContainerContextValue = {
  selectedElement: { id: string, data: any };
  setSelectedElement: (element: { id: string, data: any }) => void;
  elementToMove: { id: string, data: any };
  setElementToMove: (element: { id: string, data: any }) => void;
  activePanel: string;
  setActivePanel: (panelId: string) => void;
};

export const ContainerContext = createContext<ContainerContextValue>(null);

export const DnDContainer: React.FC = ({ children }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elementToMove, setElementToMove] = useState(null);
  const [activePanel, setActivePanel] = useState(null);

  const contextValue: ContainerContextValue = {
    selectedElement,
    setSelectedElement,
    activePanel,
    setActivePanel,
    elementToMove,
    setElementToMove,
  };

  function handleDragEnd() {
    setSelectedElement(null);
    setElementToMove(null);
    window.removeEventListener('dragover', handleDragOver);
    window.removeEventListener('drop', handleDragEnd);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  function handleDragStart() {
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDragEnd);
  }

  return (
    <ContainerContext.Provider value={contextValue}>
      <div
        className="container"
        onDragStart={handleDragStart}
      >
        {children}
      </div>
    </ContainerContext.Provider>
  );
};
