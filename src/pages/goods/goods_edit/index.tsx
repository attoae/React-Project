import React, {useRef, useState, useCallback} from 'react'
import {useParams} from 'react-router'
import {Input} from 'antd'
import SpecieCom from './children/specie-com'
import './style.scss'
import Avatar from './children/Avatar'
import PicturesWall from './children/pictures-wall'
import RichEditor from './children/rich-editor'
import CategorySelector from './children/category-selector'
import {Radio} from 'antd'


interface paramsInterface {
  type: string
  [propName: string]: any
}

const GoodsEdit: React.FC<{}> = () => {
  let params: paramsInterface = useParams();
  let {type} = params;
  const specRef = useRef<SpecieCom | null>(null);
  const avatarRef = useRef<Avatar | null>(null);
  const PicturesWallRef = useRef<PicturesWall | null>(null);
  const RichEditorRef = useRef<RichEditor | null>(null);

  // 商品名字
  const [title, setTitle] = useState('');
  const titleChange = useCallback((ev)=>{
    setTitle(ev.target.value);
  }, []);

  // 分类
  const [cateVal, setCateVal] = useState('');
  const cateChange = useCallback((val) => {
    setCateVal(val);
  },[]);

  //上下架
  const [on, setOn] = useState(true);
  const saleChange = useCallback((ev)=>{
    setOn(ev.target.value);
  }, []);


  return (
    <div id="goods-edit">
      <h1>{type === 'add' ? '新增' : '修改'}商品</h1>
      <div>
        <span>商品名称：</span>
        <Input placeholder="请输入商品的名称" type="text" value={title} onChange={titleChange}/>
      </div>
      <div>
        <span>规格参数：</span>
        <SpecieCom ref={specRef}/>
      </div>
      <div>
        <span>商品价格：</span>
        <Input placeholder="请输入商品的价格" type="number" />
      </div>
      <div>
        <span>缩略图：</span>
        <Avatar ref={avatarRef}/>
      </div>
      <div>
        <span>轮播图：</span>
        <PicturesWall ref={PicturesWallRef}/>
      </div>
      <div>
        <span>商品详情：</span>
        <RichEditor ref={RichEditorRef}/>
      </div>
      <div>
        <span>商品分类：</span>
        <CategorySelector onChange={cateChange}/>
      </div>
      <div>
        <span>上下架：</span>
        <Radio.Group onChange={saleChange} value={on}>
          {
            [true, false].map((item, index)=>(
              <Radio key={index} value={item}>{item ? '上架' : '下架'}</Radio>
            ))
          }
        </Radio.Group>
      </div>
      <button onClick={()=>{
        console.log(title);
        console.log(specRef.current?.getData());
        console.log(avatarRef.current?.getData());
        console.log(PicturesWallRef.current?.getData());
        console.log(RichEditorRef.current?.getData());
        console.log(cateVal);
        console.log(on);
      }}>按钮</button>
    </div>
  );
};

export default GoodsEdit;