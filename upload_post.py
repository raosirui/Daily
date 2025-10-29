import requests
import json

# 测试上传项目名称列表
def test_upload_projects():
    # 测试数据
    data = {
        "username": "admin",
        "password": "admin123",
        "projects": [
            "项目A-市场推广",
            "项目B-产品研发",
            "项目C-客户服务",
            "项目D-数据分析",
            "项目E-品牌建设",
            "新项目1",
            "新项目2"
        ]
    }
    
    try:
        # 发送POST请求
        response = requests.post("https://xxxx.top/upload", json=data)
        
        # 检查响应状态码
        if response.status_code == 200:
            # 打印响应结果
            print("请求成功！")
            print("响应数据:")
            print(json.dumps(response.json(), ensure_ascii=False, indent=2))
        else:
            print(f"请求失败！状态码: {response.status_code}")
            print("错误信息:")
            print(json.dumps(response.json(), ensure_ascii=False, indent=2))
    except Exception as e:
        print(f"发生异常: {e}")

if __name__ == "__main__":
    print("测试上传项目列表接口...")
    test_upload_projects()