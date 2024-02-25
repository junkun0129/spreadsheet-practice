import React, { Attributes, useEffect, useState } from "react";
import { AttributesWithPcl, Pcl } from "../types/productclassification";
import { fetchData } from "../utils/utils";
import {
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Form,
  FormItemProps,
  FormProps,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
} from "antd";
import {
  dummyAttributesWithPcls,
  dummyPcls,
} from "../data/productclassification";
import { Attribute } from "../types/attributes";
import TextArea from "antd/es/input/TextArea";
import CustomSpreadSheet from "../components/CustomSpreadSheet";
export enum InputType {
  SINGLE_LINE = "0",
  MULTI_LINE = "1",
  COMBO_INPUT = "2",
  RADIO_INPUT = "3",
  CHECKBOX_INPUT = "4",
  NUMBER_INPUT = "5",
  DATE_INPUT = "6",
}
export type Products = {
  attributes: Attribute[];
}[];
export type FieldType = {
  blockName: string;
  pclId: string;
  commonAttr: Attribute[];
  products: Products;
};
const productCd: Attribute = {
  id: "848",
  name: "商品コード",
  controlType: InputType.SINGLE_LINE,
  defaultValue: null,
  value: null,
  selectList: [],
  isCommon: "0",
};
const BlockRegisterPage = () => {
  const [displayPcl, setdisplayPcl] = useState<Pcl[]>();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [Attributes, setAttributes] = useState<{
    common: Attribute[];
    uncommon: Attribute[];
  }>({ common: [], uncommon: [] });
  const [isAttrLoading, setisAttrLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setisLoading(true);
    fetchData(dummyPcls).then((res: any) => {
      if (!res) return;
      const data = res as Pcl[];
      setdisplayPcl(data);
      setisLoading(false);
    });
  }, []);

  const handleSelect: FormItemProps["getValueFromEvent"] = (pclId) => {
    setisAttrLoading(true);
    const selectedAttributes =
      dummyAttributesWithPcls.find((item) => item.id === pclId)?.attributes ||
      [];
    const commonAttributes = selectedAttributes.filter(
      (attr) => attr.isCommon === "1"
    );
    const uncommonAttributes = selectedAttributes.filter(
      (attr) => attr.isCommon === "0"
    );
    uncommonAttributes.unshift(productCd);
    setAttributes({ common: commonAttributes, uncommon: uncommonAttributes });
    setisAttrLoading(false);
  };

  const handleSubmit: FormProps["onFinish"] = (value) => {
    console.log("object");
    console.log(value);
  };

  const handleSingle: FormItemProps["getValueFromEvent"] = (e) => {
    console.log(e.target.value);
  };
  return (
    <div>
      {!isLoading && displayPcl ? (
        <>
          <h2>Block Register Page</h2>
          <Form onFinish={handleSubmit} form={form}>
            <Form.Item<FieldType>
              label="block name"
              name="blockName"
              rules={[
                { required: true, message: "Please input your blockname!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              getValueFromEvent={handleSelect}
              label="product classification"
              name="pclId"
            >
              <Select
                options={displayPcl.map((item) => {
                  return { value: item.id, label: item.name };
                })}
              />
            </Form.Item>

            {isAttrLoading ? (
              <div>Loading...</div>
            ) : (
              Attributes.common.map((attr, i) => (
                <>
                  <Space key={i}>
                    {attr.controlType === InputType.SINGLE_LINE && (
                      <>
                        <Form.Item<FieldType>
                          label={["commonAttr", i, "name"]}
                          name={["commonAttr", i, "name"]}
                        >
                          <Input></Input>
                        </Form.Item>
                      </>
                    )}
                    {attr.controlType === InputType.MULTI_LINE && (
                      <>
                        <Form.Item<FieldType>
                          label={["commonAttr", i, "name"]}
                          name={["commonAttr", i, "name"]}
                        >
                          <TextArea></TextArea>
                        </Form.Item>
                      </>
                    )}
                    {attr.controlType === InputType.CHECKBOX_INPUT && (
                      <>
                        <Form.Item<FieldType>
                          label={["commonAttr", i, "name"]}
                          name={["commonAttr", i, "name"]}
                        >
                          <Checkbox value={attr.value}></Checkbox>
                        </Form.Item>
                      </>
                    )}
                    {attr.controlType === InputType.RADIO_INPUT && (
                      <Form.Item<FieldType>
                        label={["commonAttr", i, "name"]}
                        name={["commonAttr", i, "name"]}
                      >
                        <Radio.Group value={attr.value}>
                          {attr.selectList.map((option, index) => {
                            if (option !== "") {
                              return (
                                <Radio key={index} value={option}>
                                  {option}
                                </Radio>
                              );
                            }
                          })}
                        </Radio.Group>
                      </Form.Item>
                    )}
                    {attr.controlType === InputType.COMBO_INPUT && (
                      <>
                        <Form.Item<FieldType>
                          label={["commonAttr", i, "name"]}
                          name={["commonAttr", i, "name"]}
                        >
                          <Select
                            className=" min-w-[200px]"
                            showSearch
                            value={attr.value}
                            options={attr.selectList.map((option) => {
                              return { value: option, label: option };
                            })}
                          ></Select>
                        </Form.Item>
                      </>
                    )}

                    {attr.controlType === InputType.NUMBER_INPUT && (
                      <>
                        <Form.Item<FieldType>
                          label={["commonAttr", i, "name"]}
                          name={["commonAttr", i, "name"]}
                        >
                          <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                      </>
                    )}

                    {attr.controlType === InputType.DATE_INPUT && (
                      <>
                        <Form.Item<FieldType>
                          label={["commonAttr", i, "name"]}
                          name={["commonAttr", i, "name"]}
                        >
                          <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                      </>
                    )}
                  </Space>
                </>
              ))
            )}
            {Attributes.uncommon.length > 0 && (
              <CustomSpreadSheet uncommonAttr={Attributes.uncommon} />
            )}
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </>
      ) : (
        <div>Loading.....</div>
      )}
    </div>
  );
};

export default BlockRegisterPage;
