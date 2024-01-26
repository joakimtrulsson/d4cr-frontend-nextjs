import { v4 as uuidv4 } from 'uuid';

// Custom hook för att hantera gemensam logik för handleSave
const useHandleSave = (onChange, setSectionsData, sectionsData, onCloseSection) => {
  return (receivedSectionType, extraData, pageValue) => {
    if (onChange) {
      const newId = uuidv4();

      const newItem = {
        sectionType: receivedSectionType,
        id: newId,
        ...extraData,
      };

      if (receivedSectionType === 'BANNER') {
        newItem.cta.url = pageValue;
      }

      setSectionsData((prevSectionsData) => [...prevSectionsData, newItem]);
      onChange(JSON.stringify([...sectionsData, newItem]));
      onCloseSection();
    }
  };
};

export default useHandleSave;
