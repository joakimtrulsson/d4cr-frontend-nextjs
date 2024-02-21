import React, { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';

import Toolbar from './Toolbar/Toolbar.jsx';
import { getMarked, getBlock } from './utils/SlateUtilityFunctions.js';
import withLinks from './plugins/withLinks.js';
import withEmbeds from './plugins/withEmbeds.js';
import withEquation from './plugins/withEquation.js';
import withTables from './plugins/withTable.js';
import './Editor.css';

const Element = (props) => {
  return getBlock(props);
};

const Leaf = ({ attributes, children, leaf }) => {
  children = getMarked(leaf, children);
  return <span {...attributes}>{children}</span>;
};

const Wysiwyg = ({ onSetPreamble, editData, extended, height }) => {
  const editor = useMemo(
    () =>
      withEquation(
        withHistory(withEmbeds(withTables(withLinks(withReact(createEditor())))))
      ),
    []
  );

  const [value, setValue] = useState(
    editData || [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ]
  );

  const handleEditorChange = (newValue) => {
    // Loopa igenom varje element i newValue
    const modifiedValue = newValue.map((element) => {
      // Skapa en kopia av elementet för att undvika read-only fel
      const modifiedElement = Object.assign({}, element);

      switch (modifiedElement.type) {
        case 'headingTwo':
          // Döp om till "heading" och lägg till level: 2
          modifiedElement.type = 'heading';
          modifiedElement.level = 2;
          break;
        case 'headingThree':
          // Döp om till "heading" och lägg till level: 3
          modifiedElement.type = 'heading';
          modifiedElement.level = 3;
          break;
        case 'headingFour':
          // Döp om till "heading" och lägg till level: 4
          modifiedElement.type = 'heading';
          modifiedElement.level = 4;
          break;
        case 'orderedList':
          // Döp om till "ordered-list"
          modifiedElement.type = 'ordered-list';
          break;
        case 'unorderedList':
          // Döp om till "unordered-list"
          modifiedElement.type = 'unordered-list';
          break;
        // case 'alignLeft':
        //   // Döp om key till textAlign och sätt value till "left"
        //   modifiedElement.key = 'textAlign';
        //   modifiedElement.value = 'left';
        //   delete modifiedElement.type; // Ta bort "type" egenskapen
        //   break;
        case 'alignCenter':
          // Uppdatera textAlign till "center"
          modifiedElement.textAlign = 'center';
          modifiedElement.type = 'paragraph';
          modifiedElement.children = [
            { text: modifiedElement.children[0].children[0].text },
          ];
          break;
        case 'alignRight':
          // Uppdatera textAlign till "right"
          modifiedElement.textAlign = 'end';
          modifiedElement.type = 'paragraph';
          modifiedElement.children = [
            { text: modifiedElement.children[0].children[0].text },
          ];
          break;
        case 'table':
          if (modifiedElement.columns === 2) {
            const newElement = {
              type: 'layout',
              layout: [1, 1],
              children: modifiedElement.children[0].children.map((cell) => ({
                type: 'layout-area',
                children: cell.children,
              })),
            };
            return newElement;
          }

          if (modifiedElement.columns === 3) {
            const newElement = {
              type: 'layout',
              layout: [1, 1, 1],
              children: modifiedElement.children[0].children.map((cell) => ({
                type: 'layout-area',
                children: cell.children,
              })),
            };
            return newElement;
          }

          break;
        default:
          // Ingen åtgärd för övriga typer
          break;
      }

      return modifiedElement;
    });

    setValue(modifiedValue);
    onSetPreamble(modifiedValue);
  };

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={value} onChange={handleEditorChange}>
      <div
        className='editor-wrapper'
        style={{
          minHeight: height ? `${height.toString()}px` : extended ? '600px' : '300px',

          border: '1px solid #e1e5e9',
          borderRadius: '7px',
          padding: '0px',
        }}
      >
        <Toolbar extended={extended} />
        <Editable
          className='editor'
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          style={{
            minHeight: height ? `${height.toString()}px` : extended ? '600px' : '300px',
            borderTop: '1px solid #e1e5e9',
            paddingLeft: '10px',
          }}
        />
      </div>
    </Slate>
  );
};

export default Wysiwyg;
