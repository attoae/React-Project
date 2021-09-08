import React from 'react';
import {Input, Button, message} from 'antd';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import immutable, { Map } from 'immutable';

export default class SpecieCom extends React.Component<any, any> { 
  
  state: any = {
    data: immutable.fromJS([
      {
        id: new Date().getTime(),
        title: '',
        specie: [
          {
            id: new Date().getTime(),
            name: '',
            price: 0
          }
        ]
      }
    ])
  };

  constructor(props: any) {
    super(props);
    this.handleChangeAction = this.handleChangeAction.bind(this);
  }
  
  // 输入框事件
  handleChangeAction(param: any[], ev: React.ChangeEvent<HTMLInputElement>) {
    let params = [...param];
    let arr: any[] = [];
    let tmp:any = this.state.data;
    while(params.length > 1){
      const item = params.shift();
      const index = this.state.data.findIndex((val: any) => val.get('id') === item.id);
      arr = [...arr, index, item.value];
      tmp = this.state.data.getIn(arr);
    }
    const item = params.shift();
    const index = tmp.findIndex((val:any) => val.get('id') === item.id);
    arr = [...arr, index, item.value];

    let currentVal: string | number = ev.target.value;
    if (ev.target.type === 'number') {
      currentVal = Number(currentVal);
      ev.target.value = currentVal.toString();
    }
    
    this.setState({data: this.state.data.setIn(arr, currentVal)});


  }

  getTitleDOM() {
    return (
      <li  className="spec-item">
        <div className="spec-item-name">
          规格名
        </div>
        <div className="spec-item-content">
          <div className="spec-content-item">
            <div>参数类名</div>
            <div>对应价格</div>
          </div>
        </div>
      </li>
    )
  }

  getSpecDOM(item: any) {
    
    return (
      <div key={item.get('id')}>
        <li className="spec-item">
          <div className="spec-item-name">

            {/* 规格名 */}
            <div className="input-with-cancel">
              <Input size="small" type="text" value={item.get("title")} onChange={this.handleChangeAction.bind(this, [{id: item.get('id'), value: 'title'}])}/>
              <CloseCircleOutlined onClick={this.cancelSpecAction.bind(this, item.get('id'))}/>
            </div>
          </div>
          <div className="spec-item-content">
          {
            item.get('specie').map((spec: any) => (
              <div className="spec-content-item"  key={spec.get('id')}>
                {/* 参数类名 */}
                <div className="input-with-cancel">
                  <Input size="small"type="text" value={spec.get('name')} onChange={this.handleChangeAction.bind(this, [{id: item.get('id'), value: 'specie'}, {id: spec.get('id'), value: 'name'}])}/>
                  <CloseCircleOutlined onClick={this.cancelTypeAction.bind(this, item.get('id'), spec.get('id'))}/>
                </div>
                {/* 对应价格 */}
                <div>
                  <Input size="small"type="number" value={spec.get('price')} onChange={this.handleChangeAction.bind(this, [{id: item.get('id'), value: 'specie'}, {id: spec.get('id'), value: 'price'}])}/>
                </div>
              </div>
            ))
          }
          </div>
        </li>
        <li  className="spec-item">
          <div className="spec-item-name"></div>
          <div className="spec-item-content">
            <Button type="link" onClick={this.addTypeAction.bind(this, item.get('id'))}>
              <PlusOutlined />
            </Button>
          </div>
        </li>
        </div>
    )
  }

  render() {
    const {data} = this.state;
    return (
      <ul className="spec-list">
        {/* 表头 */}
        {this.getTitleDOM()}
        {/* 内容列表 */}
        {
          data.map((item: any) => this.getSpecDOM(item))
        }
        {/* 新增按钮 */}
        <Button type="link" onClick={this.addSpecAction.bind(this)}>新增规格</Button>
      </ul>
    )
  }

  addTypeAction(id: number) {
    const index = this.state.data.findIndex((item: any) => item.get('id') === id);
    
    const specie = this.state.data.getIn([index, 'specie']);
    const newSpec = specie.push(Map({
      id: new Date().getTime(),
      name: '',
      price: 0
    }));
    const newState = this.state.data.setIn([index, 'specie'], newSpec);
    this.setState({data: newState});
  };

  cancelTypeAction(id: Date, specID: Date) {
    const index = this.state.data.findIndex((item: any) => item.get('id') === id);
    if (this.state.data.getIn([index, 'specie']).size > 1) {
      const newSpec = this.state.data.getIn([index, 'specie']).filter((item: any) => item.get('id') !== specID);
      this.setState({data: this.state.data.setIn([index, 'specie'], newSpec)});
    } else {
      message.error('至少要有一个类别');
    }
  };

  addSpecAction() {
    this.setState({
      data: this.state.data.push(immutable.fromJS({
        id: new Date().getTime(),
        title: '',
        specie: [
          {
            id: new Date().getTime(),
            name: '',
            price: 0
          }
        ]
      }))
    });

  };

  cancelSpecAction(id: Date) {
    if (this.state.data.size > 1) {
      this.setState({data: this.state.data.filter((item: any) => item.get('id') !== id)});
    } else {
      message.error('至少要有一个规格');
    }
  }


  getData(){
    // 检查是否为空的输入框
    let newData = this.state.data.toJS();
    for(let i = 0; i < newData.length; i++) {
      const item = newData[i];
      if (!item.title) {
        message.error('输入不能为空');
        return;
      } else {
        const species = item.specie;
        for(let j = 0; j < species.length; j++) {
          const item = species[j];
          if (!Boolean(item.name && item.price)) {
            message.error('输入不能为空');
            return;
          }
        }
      }
    }

    return this.state.data.toJS();
  }
}


