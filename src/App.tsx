import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';
import { Segment } from 'semantic-ui-react';

import { DnDElement, DnDPanel, DnDContainer } from './components/DragAndDrop';

type Element = {
  id: string;
  title: string;
};

class App extends Component {
  elements: Element[] = [
    {
      id: '1',
      title: 'Element 1',
    },
    {
      id: '2',
      title: 'Element 2',
    },
    {
      id: '3',
      title: 'Element 3',
    },
  ];

  elements2: Element[] = [
    {
      id: '4',
      title: 'Element 4',
    },
    {
      id: '5',
      title: 'Element 5',
    },
    {
      id: '6',
      title: 'Element 6',
    },
  ];

  render() {
    return (
      <div className="App">
        <div>
          <DnDContainer>
            <Segment className="panel">
              <DnDPanel
                panelId="Panel 1"
                elements={this.elements}
                keyExtractor={({ id }: Element) => id}
                renderElement={({ id, title }: Element) => (
                  <DnDElement className="draggable-element" elementId={id} key={id}>
                    {title}
                  </DnDElement>
                )}
              />
            </Segment>
            <Segment className="panel">
              <DnDPanel
                panelId="Panel 2"
                elements={this.elements2}
                keyExtractor={({ id }: Element) => id}
                renderElement={({ id, title }: Element) => (
                  <DnDElement className="draggable-element" elementId={id} key={id}>
                    {title}
                  </DnDElement>
                )}
              />
            </Segment>
          </DnDContainer>
        </div>
      </div>
    );
  }
}

export default App;
