import requests

# 测试获取指定日期所有组员工作内容
def test_summary():
    # 测试数据
    data = {
        "username": "admin",
        "password": "admin123",
        "date": "20231001"  # 替换为实际需要查询的日期
    }
    
    try:
        # 发送POST请求
        response = requests.post("https://xxxx.top/summary", json=data)
        
        # 检查响应状态码
        if response.status_code == 200:
            # 打印响应结果
            print("请求成功！")
            print("响应数据:")
            print(response.json())
        else:
            print(f"请求失败！状态码: {response.status_code}")
            print("错误信息:")
            print(response.json())
    except Exception as e:
        print(f"发生异常: {e}")

if __name__ == "__main__":
    print("测试获取日报摘要接口...")
    test_summary()