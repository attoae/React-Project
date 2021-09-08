import axios, {AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosPromise} from 'axios';
import { message as messageAlert } from 'antd';

messageAlert.config({
  top: 200
})

export interface ResponseData {
  code: number
  message: string
  data: any
}

class HttpRequest {
  
  public get(url: string, config: AxiosRequestConfig = {}): AxiosPromise {
    const newConfig = this.mergeConfig(config, {url, method: 'GET'});
    return this.request(newConfig);
  }

  public post(url: string, data: any, config: AxiosRequestConfig = {}): AxiosPromise {
    const newConfig = this.mergeConfig(config, {url, method: 'POST'});
    return this.request(newConfig);
  }

  // 构建请求
  public request(config: AxiosRequestConfig): AxiosPromise {
    // 创建请求
    const instance: AxiosInstance = axios.create(config);
    // 添加请求
    this.interceptor(instance);
    // 发送请求
    return instance(config);
  }

  // 添加拦截
  private interceptor(instance: AxiosInstance) {
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config;
    }, (error) => {
      this.handleError(error.message);
      return Promise.reject(error);
    })

    instance.interceptors.response.use((response: AxiosResponse) => {
      const {data: {code, message}} = response;
      if (code === 0) {
        // 成功
      } else {
        // 失败
        this.handleError(message);
      }
      return response;
    }, (error) => {
      this.handleError(error.message);
      return Promise.reject(error);
    })
  }

  private handleError(message: string) {
    messageAlert.error(message, 0.5);
  }

  //  合并配置项
  private mergeConfig(...configs: AxiosRequestConfig[]): AxiosRequestConfig {
    return Object.assign({}, ...configs);
  }
}

export default HttpRequest;