import React from "react";

export interface SidebarDataTypes {
  componentName: string;
  link: string;
  category?: string;
  isNew?: boolean;
  isUpdated?: boolean;
  isShader?: boolean;
}

export interface ViewAreaTypes {
  title: string;
  description: string | React.ReactNode;
  preview: React.ReactNode;
  code: React.ReactNode | string;
  codeFilename?: string;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  onRefresh?: () => void;
}

export interface TabButtonTypes {
  name: string;
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode;
  layoutId?: string;
}

export interface CopyProps {
  text: string;
}

export interface Prop {
  name: string;
  type: string;
  default: string;
  description: string;
  required?: boolean;
}

export interface PropsTableProps {
  props: Prop[];
  title?: string;
}

export interface InstallationSectionProps {
  componentSource: string;
  dependencies?: string[];
  componentName?: string;
}

export interface BasePreviewWrapperProps {
  title: string;
  description: string | React.ReactNode;
  installationSource: string;
  props: Prop[];
  code?: React.ReactNode | string;
  codeFilename?: string;
  subComponents?: Array<{
    name: string;
    description: string;
    props: Prop[];
  }>;
}
