import React, { useState, useEffect, useRef, useContext } from 'react';
import { PanelContext } from './DnDPanel';
import { ContainerContext } from './DnDContainer';

type ComponentProps = {
  className?: string;
  elementId: string;
};

export const DnDElement: React.FC<ComponentProps> = ({ children, className, elementId }) => {
  const { setSelectedElement, setElementToMove, selectedElement, clearSelection } = useContext(PanelContext);
  const container = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(selectedElement && selectedElement.id === elementId);
  const [rotate, setRotate] = useState(false);

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    const { width, height } = container.current.getBoundingClientRect();
    e.dataTransfer.setDragImage(container.current, width / 2, height / 2);
    setSelectedElement(elementId);
    setTimeout(() => setVisible(true), 1);
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    setElementToMove(elementId);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function handleDrop() {
    clearSelection();
    setVisible(false);
  }

  useEffect(() => {
    if (!selectedElement) {
      setVisible(false);
    }
  }, [selectedElement]);

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleDrop}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      className={`dnd-element${className ? ` ${className}` : ''}${isVisible ? ' drop-skeleton' : ''}`}
      ref={container}
    >
      {!isVisible && children}
    </div>
  );
};
