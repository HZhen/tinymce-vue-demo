import {service} from '../axios/request'

// 上传文件的接口
export let upLoadPdf = function (data) {
  return service.post(`oss-service/oss/aegle`, data);
};