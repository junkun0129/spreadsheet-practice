import { Attribute } from "./attributes";

export type AttributesWithPcl = {
  id: string;
  name: string;
  attributes: Attribute[];
};

export type Pcl = {
  id: string;
  name: string;
};
