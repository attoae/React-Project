import React, {useCallback, useState, useRef, useEffect} from 'react';
import { Collapse } from 'antd';
import {List} from 'immutable';

const { Panel } = Collapse;

interface CollapseInterface {
  activeKey: string
  onFirstActive: (key: string) => void
}

export const AppPanel = Panel;
 

export const AppCollapse: React.FC<CollapseInterface> = ({children, activeKey, onFirstActive}) => {
  const [selectKey, setSelectKey] = useState(List([activeKey]));
  const selectRef = useRef<List<string>>(null!);
  useEffect(() => {
    selectRef.current = selectKey;
  })
  const changeAction = useCallback((keys) => {
    if (keys.length > 0) {
      let lastKey = keys[keys.length - 1];
      if (!selectRef.current.find(item => item === lastKey)) {
        onFirstActive(lastKey);
        setSelectKey(selectKey => selectKey.push(lastKey));
      }
    }
  }, [selectRef, onFirstActive]);
  return (
    <Collapse
      bordered={false} 
      defaultActiveKey={activeKey} 
      onChange={changeAction}
    >
      {children}
    </Collapse>
  );
};


