interface FileIcon {
  icon: string;
  color: string;
}

interface FileIcons {
  [key: string]: FileIcon;
}

declare const fileIcons: FileIcons;
export default fileIcons; 