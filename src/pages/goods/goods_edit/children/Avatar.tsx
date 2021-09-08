import React from 'react';
import {Upload, message} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img: any, callback: (imageUrl: string | ArrayBuffer | null)=> void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


export default class Avatar extends React.Component<{}, {loading: boolean, imageUrl: string|ArrayBuffer|null}> {
  state = {
    loading: false,
    imageUrl: ''
  };

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string|ArrayBuffer|null) =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const { imageUrl } = this.state;

    const uploadContent = imageUrl ? 
    <img src={imageUrl} alt="avatar" style={{ width: '100%' }} ></img>
    :
    <div>
      {
        this.state.loading ? <LoadingOutlined /> : <PlusOutlined />
      }
      <div className="ant-upload-text">Upload</div>
    </div>;
    
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {uploadContent}
      </Upload>
    );
  }

  getData() {
    if (this.state.imageUrl) {
      return this.state.imageUrl;
    } else {
      message.error('请上传缩略图');
    }
  }
}