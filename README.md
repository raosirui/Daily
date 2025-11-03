# Flask 日报与商机管理系统

一个基于 Python Flask 的综合管理系统，集成了日报填报展示、商机管理、用户认证、数据导出和审计日志等功能，为团队提供高效的工作管理解决方案。

## 功能特性

### 1. 用户管理
- 基于文件的用户认证系统（passwd.txt）
- 会话管理和自动登录状态维持
- 密码修改功能

### 2. 日报管理
- 支持动态添加多个工作事务
- 每个事务支持关联项目、标记挂起/求助状态
- 工作内容可指定负责人和完成状态
- 支持查看历史日报数据
- Word文档导出功能（市场部工作日志格式）

### 3. 商机管理
- 商机信息完整录入（项目名称、建设单位、信息来源、预估金额等）
- 商机状态和项目类型分类管理
- 商机数据完整展示（包含11个字段：项目名称、建设单位、信息来源、预估金额、责任人、项目性质、状态、上报时间、跟踪情况、备注、上报人）
- 商机数据JSON格式下载功能
- 项目名称重复检查机制

### 4. 项目管理
- 项目列表维护和搜索功能
- 支持项目模糊匹配搜索
- 项目名称唯一性验证

### 5. API接口
- `/summary` (POST): 获取指定日期所有用户的工作内容
- `/upload` (POST): 上传项目名称列表
- `/search_projects` (GET): 搜索项目名称（支持会话和API密钥两种认证方式）
- `/get_business_opportunities` (GET): 获取商机数据（支持会话和API密钥两种认证方式）
- `/check_project_exists` (GET): 检查项目名称是否已存在

### 6. 日志与安全
- 详细的操作审计日志（记录用户活动和API调用）
- HTTPS支持（可配置证书实现安全访问）
- 输入验证和数据安全性检查

## 安装与配置

### 1. 环境要求
- Python 3.6+
- Flask及其依赖库

### 2. 安装依赖

```bash
pip install -r requirements.txt
```

### 3. 配置文件

| 文件名 | 用途 | 格式说明 |
|--------|------|----------|
| `passwd.txt` | 用户账号密码存储 | 每行格式：`用户名:密码` |
| `project_list.json` | 项目名称列表 | JSON数组格式 |
| `project_types.json` | 项目类型配置 | JSON数组格式 |
| `business_opportunity_status.json` | 商机状态配置 | JSON数组格式 |

### 4. 目录结构

系统运行时会自动创建以下目录（如不存在）：
- `data/daily/` - 存储日报数据
- `data/business/` - 存储商机数据
- `data/docx/` - 存储导出的Word文档
- `logs/` - 存储日志文件
- `flask_session/` - 存储会话数据

## 使用说明

### 系统启动

#### 开发环境（HTTP）
```bash
python app.py
```
系统将在 http://localhost:5501 启动

#### 生产环境（HTTPS）
1. 将证书文件放置在 `certs/` 目录下：
   - `cert.pem` - 证书文件
   - `privkey.pem` - 私钥文件
   - `chain.pem` - 中间证书（可选）

2. 启动服务：
```bash
python app.py
```
系统会自动检测证书并在 https://localhost:5501 启动

### 日常使用

#### 1. 登录系统
访问系统首页，使用 `passwd.txt` 中配置的账号密码登录。

#### 2. 日报管理
- 选择填报日期
- 添加工作事务（可添加多个）
- 填写工作内容，选择关联项目
- 设置挂起状态、求助信息（可选）
- 指定负责人和完成状态
- 点击提交按钮保存日报
- 可在同一页面查看其他用户的日报
- 使用下载按钮导出Word格式的工作日志

#### 3. 商机管理
- 点击导航进入商机管理页面
- 填写商机信息：项目名称、建设单位、信息来源等
- 选择项目性质、负责人、状态
- 添加跟踪情况和备注
- 提交保存商机数据
- 使用下载按钮导出商机数据为JSON格式文本文件

## 文件结构

```
.
├── app.py                          # Flask 应用主文件
├── templates/                      # HTML 模板目录
│   ├── login.html                  # 登录页面
│   ├── daily_report.html           # 日报填报与展示页面
│   └── business_report.html        # 商机管理页面
├── static/                         # 静态文件目录
│   ├── css/                        # CSS 样式文件
│   │   └── style.css
│   └── js/                         # JavaScript 文件
│       └── script.js
├── data/                           # 数据存储目录
│   ├── daily/                      # 日报数据文件
│   ├── business/                   # 商机数据
│   │   └── opportunities.json
│   └── docx/                       # 导出的Word文档
├── certs/                          # 证书目录（HTTPS）
├── logs/                           # 日志文件目录
├── passwd.txt                      # 用户密码文件
├── project_list.json               # 项目列表文件
├── project_types.json              # 项目类型配置
├── business_opportunity_status.json # 商机状态配置
├── summary_post.py                 # API测试脚本：获取日报摘要
├── upload_post.py                  # API测试脚本：上传项目列表
├── rename_files.py                 # 辅助脚本
├── requirements.txt                # Python依赖包列表
└── README.md                       # 项目说明文档
```

## API 使用说明

### 1. 获取日报摘要
```bash
POST /summary
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password",
  "date": "20251030"
}
```

### 2. 上传项目列表
```bash
POST /upload
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password",
  "projects": ["项目1", "项目2"]
}
```

### 3. 搜索项目
```bash
GET /search_projects?keyword=搜索关键词&username=your_username&password=your_password
```

### 4. 获取商机数据
```bash
GET /get_business_opportunities?username=your_username&password=your_password
```

## 注意事项

1. **数据安全**：系统默认使用HTTP模式，生产环境请配置HTTPS证书
2. **文件权限**：确保应用有数据目录和日志目录的读写权限
3. **备份**：定期备份 `data/` 目录下的数据文件
4. **证书配置**：Windows环境下，证书文件应放在 `certs/` 文件夹中

## 故障排除

1. **HTTPS启动失败**：检查证书文件路径和权限
2. **数据保存失败**：检查磁盘空间和文件权限
3. **登录失败**：确认 `passwd.txt` 中的用户名和密码是否正确

## 开发指南

如需扩展系统功能，主要修改以下文件：
- `app.py` - 添加新的路由和业务逻辑
- `templates/` - 添加或修改页面模板
- `static/css/style.css` - 修改样式
- `static/js/script.js` - 添加前端交互逻辑

### 4. API 使用

#### 获取日报摘要

使用 summary_post.py 脚本测试，修改脚本中的用户名、密码和日期参数。

```bash
python summary_post.py
```

#### 上传项目列表

使用 upload_post.py 脚本测试，修改脚本中的项目列表。

```bash
python upload_post.py
```

## 注意事项

1. 证书文件路径在 app.py 中配置，默认为：
2. 日志文件保存在 logs/ 目录下，按日期命名。
3. 日报数据以 JSON 格式保存，文件名格式为：yyyyMMdd_用户名.json。
4. 系统重启不会覆盖历史数据。
