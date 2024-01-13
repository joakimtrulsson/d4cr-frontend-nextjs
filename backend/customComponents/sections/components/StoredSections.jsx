import React from 'react';
import { Button } from '@keystone-ui/button';
import { MinusCircleIcon, EditIcon } from '@keystone-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

import { styles } from '../styles.js';

function StoredSections({ sectionsData, onChange }) {
  const onMoveSection = (currentIndex, direction) => {
    const sectionsCopy = [...sectionsData];
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < sectionsCopy.length) {
      const temp = sectionsCopy[currentIndex];
      sectionsCopy[currentIndex] = sectionsCopy[newIndex];
      sectionsCopy[newIndex] = temp;
      onChange(JSON.stringify(sectionsCopy));
    }
  };

  const onDeleteSection = (id) => {
    if (onChange) {
      const sectionsCopy = sectionsData.filter((section) => section.id !== id);
      onChange(JSON.stringify(sectionsCopy));
      // const sectionsCopy = [...sectionsData];
      // sectionsCopy.splice(index, 1);
      // onChange(JSON.stringify(sectionsCopy));
    }
  };

  return (
    <ol style={{ paddingLeft: '0', paddingTop: '1rem', borderTop: '1px solid #e1e5e9' }}>
      {sectionsData.map((section, index) => {
        return (
          <li key={section.id} className={styles.list.li}>
            <div className={styles.list.data}>
              <div className={styles.list.dataLabel}>{section.sectionType}</div>
            </div>
            {onChange && (
              <div>
                <Button
                  size='small'
                  className={styles.list.optionButton}
                  onClick={() => onMoveSection(index, 'up')}
                >
                  &#9650;
                </Button>
                <Button
                  size='small'
                  className={styles.list.optionButton}
                  onClick={() => onMoveSection(index, 'down')}
                >
                  &#9660;
                </Button>
                <Button
                  size='small'
                  // onClick={() => onEditSection(i)}
                  className={styles.list.optionButton}
                >
                  <EditIcon size='small' color='blue' />
                </Button>
                <Button size='small' className={styles.list.optionButton}>
                  <MinusCircleIcon
                    size='small'
                    color='red'
                    onClick={() => onDeleteSection(section.id)}
                  />
                </Button>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default StoredSections;
