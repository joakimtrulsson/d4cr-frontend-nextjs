import { useEffect, useState } from 'react';
import { IconLookup, IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

export const useFontAwesomeIconPack = () => {
  const [iconPack, setIconPack] = useState();

  useEffect(() => {
    if (!iconPack) {
      import('@fortawesome/free-solid-svg-icons').then((module) => {
        // Delete problematic icons
        console.log(module);
        const fas = { ...module.fas };
        delete fas.faCookie;
        delete fas.faFontAwesomeLogoFull;

        const icons = Object.values(fas).map((icon) => ({
          prefix: icon.prefix,
          icon: icon.icon,
          iconName: icon.iconName,
        }));

        import('@fortawesome/free-brands-svg-icons').then((module) => {
          const fab = { ...module.fab };

          const brandIcons = Object.values(fab).map((icon) => ({
            prefix: icon.prefix,
            icon: icon.icon,
            iconName: icon.iconName,
          }));

          // Concatenate solidIcons and brandIcons
          const allIcons = [...icons, ...brandIcons];

          // Add all icons to the library
          library.add(...allIcons);

          // Set the icon pack state
          setIconPack(allIcons);
        });
      });
    }
  }, [iconPack]);

  return iconPack;
};

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';

// import { fab } from '@fortawesome/free-brands-svg-icons';

// export function useIconPickerPack() {
//   library.add(fas, fab);
//   const iconPack = [
//     ...Object.keys(fas).map((key) => ['fas', key]),

//     ...Object.keys(fab).map((key) => ['fab', key]),
//   ];
//   return iconPack;
// }
