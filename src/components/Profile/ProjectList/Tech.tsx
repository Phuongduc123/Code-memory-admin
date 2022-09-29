import { CloseCircleOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import Avatar from 'antd/lib/avatar/avatar';

export interface TechInterface {
  data: any;
  setFieldValue?: any;
  field?: any;
  index: number;
  optionsChoosed?: any;
  setOptionsChoosed?: any;
}

export const Tech: FC<TechInterface> = ({ data, setFieldValue, field, index, optionsChoosed, setOptionsChoosed }) => {
  const removeItem = () => {
    const fieldValue = [...field.value];
    const optionsChoosedValue = optionsChoosed;
    fieldValue.splice(index, 1);
    optionsChoosedValue.splice(index, 1);
    setFieldValue(field.name, fieldValue);
    setOptionsChoosed(optionsChoosedValue);
  };

  return (
    <div className="tech">
      <div className="avt-text">
        <Avatar size="small" src={data.thumbnail} />
        <div className="text">{data.title}</div>
      </div>
      {!!field && <CloseCircleOutlined onClick={removeItem} className="close-icon" />}
    </div>
  );
};
