import React, { useEffect, useState } from "react";
import Spreadsheet, { CellBase } from "react-spreadsheet";
import { Attribute } from "../types/attributes";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
} from "antd";
import { FieldType } from "../pages/BlockRegisterPage";
import TextArea from "antd/es/input/TextArea";
export type SheetColumn = { value: string };
export type SheetRow = SheetColumn[];
enum InputType {
  SINGLE_LINE = "0",
  MULTI_LINE = "1",
  COMBO_INPUT = "2",
  RADIO_INPUT = "3",
  CHECKBOX_INPUT = "4",
  NUMBER_INPUT = "5",
  DATE_INPUT = "6",
}
type Props = {
  uncommonAttr: Attribute[];
};
const CustomSpreadSheet = ({ uncommonAttr }: Props) => {
  console.log(uncommonAttr);
  const [dataSource, setdataSource] = useState<SheetRow[]>();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const { rowLabels, AddRowsButton, DeleteRowsButton } = useRowControl({
    firstNum: 10,
  });
  const [ColumnLables, setColumnLables] = useState<string[]>();
  useEffect(() => {
    if (uncommonAttr) {
      setColumnLables(uncommonAttr.map((attr, i) => attr.name));
      const newData = rowLabels.map((row, rowIndex) => {
        return uncommonAttr.map((col, colIndex) => {
          return { value: "" };
        });
      });
      setdataSource(newData);
    }
  }, [uncommonAttr]);

  return (
    <div>
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Space>
              <AddRowsButton />
              <DeleteRowsButton />
            </Space>
            {dataSource && uncommonAttr && (
              <Spreadsheet
                columnLabels={ColumnLables}
                rowLabels={rowLabels}
                data={dataSource}
                DataViewer={({ column, row }, i) => {
                  if (!uncommonAttr[column].controlType) return;
                  switch (uncommonAttr[column].controlType) {
                    case InputType.SINGLE_LINE:
                      return (
                        <Form.Item<FieldType>
                          name={["products", row, "attributes", column]}
                        >
                          <Input style={{ zIndex: 10 }} />
                        </Form.Item>
                      );

                    case InputType.MULTI_LINE:
                      return (
                        <Form.Item<FieldType>
                          name={["products", row, "attributes", column]}
                        >
                          <TextArea style={{ zIndex: 10 }} />
                        </Form.Item>
                      );
                    case InputType.CHECKBOX_INPUT:
                      return (
                        <Form.Item<FieldType>
                          name={["products", row, "attributes", column]}
                        >
                          <Checkbox
                            style={{ zIndex: 10 }}
                            value={uncommonAttr[column].value}
                          />
                        </Form.Item>
                      );
                      break;
                    case InputType.COMBO_INPUT:
                      return (
                        <Form.Item<FieldType>
                          name={["products", row, "attributes", column]}
                        >
                          <Select
                            style={{ zIndex: 10 }}
                            showSearch
                            value={uncommonAttr[column].value}
                            options={uncommonAttr[column].selectList?.map(
                              (option) => {
                                return { value: option, label: option };
                              }
                            )}
                          ></Select>
                        </Form.Item>
                      );
                      break;
                    case InputType.DATE_INPUT:
                      return (
                        <>
                          <Form.Item<FieldType>
                            name={["products", row, "attributes", column]}
                          >
                            <DatePicker style={{ width: "100%", zIndex: 10 }} />
                          </Form.Item>
                        </>
                      );
                      break;
                    case InputType.NUMBER_INPUT:
                      return (
                        <>
                          <Form.Item<FieldType>
                            name={["products", row, "attributes", column]}
                          >
                            <InputNumber style={{ zIndex: 10 }} />
                          </Form.Item>
                        </>
                      );
                      break;
                    case InputType.RADIO_INPUT:
                      return (
                        <>
                          <Form.Item<FieldType>
                            name={["products", row, "attributes", column]}
                          >
                            <Radio.Group
                              style={{ zIndex: 10 }}
                              value={uncommonAttr[column]}
                            >
                              {uncommonAttr[column].selectList.map(
                                (option, index) => {
                                  if (option !== "") {
                                    return (
                                      <Radio
                                        style={{ zIndex: 10 }}
                                        key={index}
                                        value={option}
                                      >
                                        {option}
                                      </Radio>
                                    );
                                  }
                                }
                              )}
                            </Radio.Group>
                          </Form.Item>
                        </>
                      );
                      break;
                  }
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomSpreadSheet;

const useRowControl = ({ firstNum }: { firstNum: number }) => {
  const calcNum = 10;
  const [rowNum, setrowNum] = useState<number>(firstNum);
  const [rowLabels, setrowLabels] = useState<string[]>(
    Array.from({ length: firstNum }, (item, i) => {
      return (i + 1).toString();
    })
  );
  useEffect(() => {
    setrowLabels(
      Array.from({ length: rowNum }, (item, i) => {
        return (i + 1).toString();
      })
    );
  }, [rowNum]);
  const handleAddClick = () => {
    setrowNum((pre) => pre + calcNum);
  };
  const handleDeleteClick = () => {
    if (rowNum - calcNum >= firstNum) {
      setrowNum((pre) => pre - calcNum);
    }
  };
  const AddRowsButton = () => {
    return (
      <>
        <Button type="primary" onClick={handleAddClick}>
          行の追加
        </Button>
      </>
    );
  };
  const DeleteRowsButton = () => {
    return (
      <>
        <Button type="primary" onClick={handleDeleteClick}>
          行の削除
        </Button>
      </>
    );
  };

  return { AddRowsButton, DeleteRowsButton, rowLabels };
};
