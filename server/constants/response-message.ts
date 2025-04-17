import { ResponseCode } from './response-code';

export const ResponseMessage: Record<ResponseCode, string> = {
  // 成功状态码
  [ResponseCode.SUCCESS]: '操作成功',
  [ResponseCode.CREATED]: '创建成功',
  [ResponseCode.ACCEPTED]: '已接受',
  [ResponseCode.NO_CONTENT]: '无内容',

  // 客户端错误状态码
  [ResponseCode.BAD_REQUEST]: '请求错误',
  [ResponseCode.UNAUTHORIZED]: '未授权',
  [ResponseCode.FORBIDDEN]: '禁止访问',
  [ResponseCode.NOT_FOUND]: '资源不存在',
  [ResponseCode.METHOD_NOT_ALLOWED]: '方法不允许',
  [ResponseCode.CONFLICT]: '资源冲突',
  [ResponseCode.UNPROCESSABLE_ENTITY]: '参数验证错误',
  [ResponseCode.TOO_MANY_REQUESTS]: '请求过于频繁',

  // 服务器错误状态码
  [ResponseCode.INTERNAL_SERVER_ERROR]: '服务器内部错误',
  [ResponseCode.SERVICE_UNAVAILABLE]: '服务不可用',
  [ResponseCode.GATEWAY_TIMEOUT]: '网关超时',

  // 用户相关
  [ResponseCode.USER_NOT_EXIST]: '用户不存在',
  [ResponseCode.USER_ALREADY_EXIST]: '用户已存在',
  [ResponseCode.PASSWORD_ERROR]: '密码错误',
  [ResponseCode.ACCOUNT_LOCKED]: '账号被锁定',
  [ResponseCode.TOKEN_EXPIRED]: 'Token已过期',
  [ResponseCode.TOKEN_INVALID]: 'Token无效',

  // 文件相关
  [ResponseCode.FILE_UPLOAD_FAILED]: '文件上传失败',
  [ResponseCode.FILE_NOT_EXIST]: '文件不存在',
  [ResponseCode.FILE_SIZE_EXCEEDED]: '文件大小超出限制',
  [ResponseCode.FILE_TYPE_NOT_ALLOWED]: '文件类型不允许',

  // 数据相关
  [ResponseCode.DATA_NOT_FOUND]: '数据不存在',
  [ResponseCode.DATA_ALREADY_EXIST]: '数据已存在',
  [ResponseCode.DATA_VALIDATION_ERROR]: '数据验证错误',
  [ResponseCode.DATA_OPERATION_FAILED]: '数据操作失败',

  // 系统相关
  [ResponseCode.SYSTEM_ERROR]: '系统错误',
  [ResponseCode.CONFIG_ERROR]: '配置错误',
  [ResponseCode.NETWORK_ERROR]: '网络错误',
  [ResponseCode.DATABASE_ERROR]: '数据库错误',
}; 