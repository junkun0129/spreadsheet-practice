export type Attribute = {
  id: string;
  name: string;
  controlType: InputType;
  defaultValue: null | string;
  value: null | string;
  selectList: string[];
  isCommon: "0" | "1";
};

export enum InputType {
  SINGLE_LINE = "0",
  MULTI_LINE = "1",
  COMBO_INPUT = "2",
  RADIO_INPUT = "3",
  CHECKBOX_INPUT = "4",
  NUMBER_INPUT = "5",
  DATE_INPUT = "6",
}
