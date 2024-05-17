import { CustomRenderer } from '../CustomRenderer/CustomRenderer';

export default function WYSIWYG({ content }) {
  return <CustomRenderer document={content} />;
}
