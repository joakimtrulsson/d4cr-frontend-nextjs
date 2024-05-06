export const markConsecutiveMediaTextSections = (sections) => {
  let mediaTextGroupCount = 0;
  let currentGroupStart = null;
  let tempSections = [...sections];

  sections.forEach((section, index) => {
    const isMediaText = section.sectionType === 'MEDIATEXT';
    const nextSectionIsMediaText = sections[index + 1]?.sectionType === 'MEDIATEXT';

    if (isMediaText && nextSectionIsMediaText) {
      if (currentGroupStart === null) {
        currentGroupStart = index;
      }
      mediaTextGroupCount++;
    } else if (isMediaText && currentGroupStart !== null) {
      mediaTextGroupCount++;
      const groupCount = mediaTextGroupCount;
      for (let i = currentGroupStart; i < currentGroupStart + mediaTextGroupCount; i++) {
        tempSections[i] = {
          ...tempSections[i],
          isConsecutiveMediaText: true,
          mediaTextGroupIndex: i - currentGroupStart + 1,
          mediaTextGroupCount: groupCount,
        };
      }
      currentGroupStart = null;
      mediaTextGroupCount = 0;
    }
  });

  return tempSections;
};
