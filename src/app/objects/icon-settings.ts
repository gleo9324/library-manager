// icons-settings.ts

export interface IconSettings {
  fill: string;
  // Altre proprietà specifiche dell'icona se necessario
}

export interface IconsSettings {
  [iconName: string]: IconSettings;
}

export const iconSettings: IconsSettings = {
  'esc-icon': {
    fill: 'var(--light-color)',
    // Altre impostazioni specifiche per 'esc-icon' se necessario
  },
  'ok-icon': {
    fill: 'var(--light-color)',
  },
  'bin-icon': {
    fill: 'var(--light-color)',
  },
  'edit-icon': {
    fill: 'var(--light-color)',
  },
  'printer-icon': {
    fill: 'var(--light-color)',
  },
  'send-icon': {
    fill: 'var(--light-color)',
  },
  // Aggiungi altre icone con le loro impostazioni se necessario
};
