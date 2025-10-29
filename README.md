# Flask 日报管理系统

一个基于 Python Flask 的组员日报填报与展示系统，支持登录、日报填写、项目关联、数据导出、审计日志、HTTPS 等功能。

## 功能特性

1. **用户认证**
   - 使用 passwd.txt 存储用户账号密码
   - 支持登录后会话管理

2. **日报填报**
   - 支持动态添加多个事务条目
   - 每个事务包含工作内容、关联项目、挂起状态、求助状态等信息
   - 支持项目搜索（模糊匹配）

3. **日报展示**
   - 表格展示所有组员的前一日和当日工作
   - 支持导出为 Word 文档

4. **API接口**
   - POST /summary：获取指定日期所有组员工作内容
   - POST /upload：上传项目名称列表
   - GET /search_projects：搜索项目名称

5. **安全与日志**
   - 支持 HTTPS 部署
   - 审计日志记录所有操作

## 安装说明

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 配置文件

- **passwd.txt**：用户账号密码文件（格式：用户名:密码，每行一个）
- **project_list.json**：项目名称列表文件

### 3. 启动服务

#### 开发环境（HTTP）

```bash
python app.py
```

#### 生产环境（HTTPS）

确保证书文件路径正确，然后运行：

```bash
python app.py
```

系统会自动检测证书文件并使用 HTTPS 启动。

## 文件结构

```
.
├── app.py                  # Flask 应用主文件
├── templates/              # HTML 模板目录
│   ├── login.html          # 登录页面
│   └── daily_report.html   # 日报填报与展示页面
├── static/                 # 静态文件目录
│   ├── css/                # CSS 文件
│   └── js/                 # JavaScript 文件
├── logs/                   # 日志文件目录
├── passwd.txt              # 用户密码文件
├── project_list.json       # 项目列表文件
├── summary_post.py         # 获取日报摘要接口测试脚本
├── upload_post.py          # 上传项目列表接口测试脚本
├── requirements.txt        # Python 依赖包列表
└── README.md               # 项目说明文档
```

## 使用说明

### 1. 用户登录

访问系统首页，使用 passwd.txt 中配置的账号密码登录。

### 2. 填写日报

- 选择填报日期
- 填写工作内容，可动态添加多个事务
- 选择关联项目（支持搜索）
- 根据需要填写挂起和求助信息
- 点击提交按钮保存日报

### 3. 查看日报

- 在日报展示区域选择日期
- 查看所有组员的工作内容
- 点击下载按钮导出 Word 文档

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
   - /etc/letsencrypt/live/hushunlong.top/cert.pem
   - /etc/letsencrypt/live/hushunlong.top/privkey.pem

2. 日志文件保存在 logs/ 目录下，按日期命名。

3. 日报数据以 JSON 格式保存，文件名格式为：yyyyMMdd_用户名.json。

4. 系统重启不会覆盖历史数据。