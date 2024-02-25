export type TreeNodeCategory = {
  code: React.Key;
  name: string;
  note: string;
  img: string;
  img_mobile?: string;
};

export type TreeNodeType = {
  category: TreeNodeCategory;
  children?: TreeNodeType[];
};
