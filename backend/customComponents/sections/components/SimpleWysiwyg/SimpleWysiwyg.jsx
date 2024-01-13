import React, { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';
import Toolbar from './Toolbar/Toolbar.jsx';
import { getMarked, getBlock } from './utils/SlateUtilityFunctions.js';
import withLinks from './plugins/withLinks.js';
import withTables from './plugins/withTable.js';
import withEmbeds from './plugins/withEmbeds.js';
import withEquation from './plugins/withEquation.js';
import './editor.css';
import CodeToText from './Elements/CodeToText/CodeToText.jsx';
import { serialize } from './utils/serializer.js';

const Element = (props) => {
  return getBlock(props);
};
const Leaf = ({ attributes, children, leaf }) => {
  children = getMarked(leaf, children);
  return <span {...attributes}>{children}</span>;
};
const SimpleWysiwyg = ({ onSetPremble }) => {
  const editor = useMemo(
    () =>
      withEquation(
        withHistory(withEmbeds(withTables(withLinks(withReact(createEditor())))))
      ),
    []
  );
  const [value, setValue] = useState([
    {
      type: 'paragaph',
      children: [{ text: '' }],
    },
  ]);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    onSetPremble(newValue);
  };

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const [htmlAction, setHtmlAction] = useState({
    showInput: false,
    html: '',
    action: '',
    location: '',
  });
  const handleCodeToText = (partialState) => {
    setHtmlAction((prev) => ({
      ...prev,
      ...partialState,
    }));
  };

  return (
    <Slate editor={editor} initialValue={value} onChange={handleEditorChange}>
      <Toolbar handleCodeToText={handleCodeToText} />
      <div
        className='editor-wrapper'
        style={{
          minHeight: '100px', // minimum height
          maxHeight: '300px', // maximum height
          overflow: 'auto',
          border: '1px solid #f3f3f3',
          padding: '0 10px',
        }}
      >
        <Editable
          placeholder='Write something...'
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </div>
      {htmlAction.showInput && (
        <CodeToText {...htmlAction} handleCodeToText={handleCodeToText} />
      )}
    </Slate>
  );
};

export default SimpleWysiwyg;
