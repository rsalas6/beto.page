export type Metadata = {
  title: string;
  description: string;
};

export type Entry = {
  href: string;
  title: string;
  description?: string;
};

export type Tool = {
  title: string;
  description: string;
  href: string;
  draft: boolean;
};

export type ToolGroup = {
  title: string;
  description: string;
  tools: Tool[];
};