import React, { createContext, useContext, useEffect, useState } from 'react';
import './DnDPanel.scss';
import { List } from 'immutable';
import { ContainerContext } from './DnDContainer';

type ComponentProps = {
  elements: any[];
  keyExtractor: (element: any) => string;
  renderElement: (element: any) => React.ReactNode;
  panelId: string;
};

type PanelContextValue = {
  selectedElement: { id: string, data: any };
  setElementToMove: (elementId: string) => void;
  setSelectedElement: (elementId: string) => void;
  clearSelection: () => void,
};

export const PanelContext = createContext<PanelContextValue>(null);

export const DnDPanel: React.FC<ComponentProps> =
  ({ children, elements, renderElement, keyExtractor, panelId }) => {
    const { selectedElement, setSelectedElement, activePanel, setActivePanel, elementToMove, setElementToMove }
      = useContext(ContainerContext);
    const [sortedElements, setSortedElements] = useState(List(elements));

    function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
      setActivePanel(panelId);
      if (activePanel && activePanel !== panelId) {
        setSortedElements(sortedElements.push(selectedElement.data));
      }
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
      e.preventDefault();
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
      setElementToMove(null);
    }

    useEffect(() => {
      if (activePanel && panelId !== activePanel) {
        const selectedElementIndex =
          sortedElements.findIndex(element => selectedElement.id === keyExtractor(element));


        if (selectedElementIndex >= 0) {
          setSortedElements(sortedElements.delete(selectedElementIndex));
        }
        setElementToMove(null);
      }
    }, [activePanel]);

    useEffect(() => {

      if (selectedElement && elementToMove && selectedElement.id !== elementToMove.id) {

        const selectedElementIndex =
          sortedElements.findIndex(element => selectedElement.id === keyExtractor(element));

        const elementToMoveIndex =
          sortedElements.findIndex(element => elementToMove.id === keyExtractor(element));

        if (elementToMoveIndex > -1) {
          setSortedElements(sortedElements
            .delete(selectedElementIndex).insert(elementToMoveIndex, selectedElement.data));
        }

      }
    }, [selectedElement, elementToMove]);

    const contextValue: PanelContextValue = {
      selectedElement,
      setElementToMove: elementId =>
        setElementToMove({
          id: elementId,
          data: sortedElements.find(element => keyExtractor(element) === elementId),
        }),
      setSelectedElement: (elementId) => {
        setActivePanel(panelId);
        setSelectedElement({
          id: elementId,
          data: sortedElements.find(element => keyExtractor(element) === elementId),
        });
      },
      clearSelection: () => {
        setSelectedElement(null);
        setElementToMove(null);
      },
    };

    return (
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="dnd-panel"
      >
        <div className="content-wrapper">
          <PanelContext.Provider value={contextValue}>
            {sortedElements.map(renderElement)}
          </PanelContext.Provider>
        </div>
      </div>
    );
  };
