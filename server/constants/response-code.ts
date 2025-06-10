export enum ResponseCode {
  // 成功状态码
  SUCCESS = 200, // 成功
  CREATED = 201, // 创建成功
  ACCEPTED = 202, // 已接受
  NO_CONTENT = 204, // 无内容

  // 客户端错误状态码
  BAD_REQUEST = 400, // 请求错误
  UNAUTHORIZED = 401, // 未授权
  FORBIDDEN = 403, // 禁止访问
  NOT_FOUND = 404, // 资源不存在
  METHOD_NOT_ALLOWED = 405, // 方法不允许
  CONFLICT = 409, // 冲突
  UNPROCESSABLE_ENTITY = 422, // 参数验证错误
  TOO_MANY_REQUESTS = 429, // 请求过于频繁

  // 服务器错误状态码
  INTERNAL_SERVER_ERROR = 500, // 服务器内部错误
  SERVICE_UNAVAILABLE = 503, // 服务不可用
  GATEWAY_TIMEOUT = 504, // 网关超时

  // 业务状态码 (1000-9999)
  // 用户相关 (1000-1999)
  USER_NOT_EXIST = 1000, // 用户不存在
  USER_ALREADY_EXIST = 1001, // 用户已存在
  PASSWORD_ERROR = 1002, // 密码错误
  ACCOUNT_LOCKED = 1003, // 账号被锁定
  TOKEN_EXPIRED = 1004, // Token已过期
  TOKEN_INVALID = 1005, // Token无效

  // 文件相关 (2000-2999)
  FILE_UPLOAD_FAILED = 2000, // 文件上传失败
  FILE_NOT_EXIST = 2001, // 文件不存在
  FILE_SIZE_EXCEEDED = 2002, // 文件大小超出限制
  FILE_TYPE_NOT_ALLOWED = 2003, // 文件类型不允许

  // 数据相关 (3000-3999)
  DATA_NOT_FOUND = 3000, // 数据不存在
  DATA_ALREADY_EXIST = 3001, // 数据已存在
  DATA_VALIDATION_ERROR = 3002, // 数据验证错误
  DATA_OPERATION_FAILED = 3003, // 数据操作失败

  // 系统相关 (4000-4999)
  SYSTEM_ERROR = 4000, // 系统错误
  CONFIG_ERROR = 4001, // 配置错误
  NETWORK_ERROR = 4002, // 网络错误
  DATABASE_ERROR = 4003, // 数据库错误
}
