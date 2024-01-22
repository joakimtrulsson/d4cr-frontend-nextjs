import React, { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';

import Toolbar from './Toolbar/Toolbar.jsx';
import { getMarked, getBlock } from './utils/SlateUtilityFunctions.js';
import withLinks from './plugins/withLinks.js';
import withEmbeds from './plugins/withEmbeds.js';
import withEquation from './plugins/withEquation.js';
import './Editor.css';

const Element = (props) => {
  return getBlock(props);
};
const Leaf = ({ attributes, children, leaf }) => {
  children = getMarked(leaf, children);
  return <span {...attributes}>{children}</span>;
};
const ExtendedWysiwyg = ({ onSetPreamble }) => {
  const editor = useMemo(
    () => withEquation(withHistory(withEmbeds(withLinks(withReact(createEditor()))))),
    []
  );

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    onSetPreamble(newValue);
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
          minHeight: '600px',
          overflow: 'auto',
          border: '1px solid #e1e5e9',
          borderRadius: '7px',
          padding: '0 00px',
        }}
      >
        <Toolbar />
        <Editable
          className='editor'
          placeholder='Write something...'
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          style={{
            borderTop: '1px solid #e1e5e9',
            paddingLeft: '10px',
            margin: '0px',
          }}
        />
      </div>
    </Slate>
  );
};

export default ExtendedWysiwyg;
