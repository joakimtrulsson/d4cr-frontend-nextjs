import React, { useState, useEffect, useCallback } from 'react'
import { createEditor } from "slate";
import { Slate, withReact, Editable } from "slate-react"
import YoutubeEmbed from '../../components/youtube-embed.js'
import SpotifyEmbed from '../../components/spotify-embed.js'
import '../scss/base/utils.scss'

export default function DocumentRenderer({ content }) {

  const [editor] = useState(() => withReact(createEditor()));
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const Element = ({ attributes, children, element }) => {

    const style = { textAlign: element.align };

    switch (element.type) {
      case 'alignLeft':
        return <div className={element.className} style={{ textAlign: 'start' }} {...attributes}>{children}</div>;

      case 'alignCenter':
        return <div className={element.className} style={{ textAlign: 'center' }} {...attributes}>{children}</div>;

      case 'alignRight':
        return <div className={element.className} style={{ textAlign: 'end' }} {...attributes}>{children}</div>;

      case 'blockQuote':
        return <blockquote className={element.className} style={style} {...attributes}>{children}</blockquote>;

      case 'headingOne':
        return <h1 className={element.className} style={style} {...attributes}>{children}</h1>;

      case 'headingTwo':
        return <h2 className={element.className} style={style} {...attributes}>{children}</h2>;

      case 'headingThree':
        return <h3 className={element.className} style={style} {...attributes}>{children}</h3>;

      case 'headingFour':
        return <h4 className={element.className} style={style} {...attributes}>{children}</h4>;

      case 'headingFive':
        return <h5 className={element.className} style={style} {...attributes}>{children}</h5>;

      case 'headingSix':
        return <h6 className={element.className} style={style} {...attributes}>{children}</h6>;

      case 'list-item':
        return <li className={element.className} style={style} {...attributes}>{children}</li>;

      case 'orderedList':
        return <ol className={element.className} style={style} {...attributes}>{children}</ol>;

      case 'unorderedList':
        return <ul className={element.className} style={style} {...attributes}>{children}</ul>;

      case 'table':
        return <div className={`${element.className}`} style={style} {...attributes}>{children}</div>

      case 'table-row':
        return <div className={`flex flex-row flex-justify-between ${element.className}`} style={style} {...attributes}>{children}</div>

      case 'table-cell':
        return <div className={`${element.className}`} style={style} {...attributes}>{children}</div>

      case 'img':
        return <img className={element.className} style={style} alt={element.alt} src={element.src} {...attributes} />;

      case 'link':
        return <a className={element.className} href={element.href} {...attributes}>{children}</a>;

      case 'paragraph':
        return <p className={element.className} style={style} {...attributes}>{children}</p>;

      case 'spotify':
        return <SpotifyEmbed className={element.className} url={element.url} />;

      case 'video':
        return <YoutubeEmbed className={element.className} url={element.url} />;

      default:
        return <div className={element.className} style={style} {...attributes}>{children}</div>;
    }
  };

  const Leaf = ({ attributes, children, leaf }) => {

    if (leaf.bold) {
      children = <strong>{children}</strong>
    }

    if (leaf.code) {
      children = <code>{children}</code>
    }

    if (leaf.italic) {
      children = <em>{children}</em>
    }

    if (leaf.underline) {
      children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
  }

  return (
    <div className="document-render wysiwyg-container">
      <Slate editor={editor} initialValue={content}>
        <Editable readOnly renderElement={renderElement} renderLeaf={renderLeaf} />
      </Slate>
    </div>
  );
}