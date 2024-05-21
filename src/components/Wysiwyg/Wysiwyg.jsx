import { CustomRenderer } from '../index.js';

export default function WYSIWYG({ content }) {
  return <CustomRenderer document={content} />;
}
