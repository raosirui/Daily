import json
import os

def get_business_opportunities():
    # 商机数据文件路径
    file_path = os.path.join('data', 'business', 'opportunities.json')
    
    try:
        # 读取JSON文件
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 格式化输出JSON数据
        formatted_json = json.dumps(data, ensure_ascii=False, indent=2)
        print(formatted_json)
        
        # 同时返回数据，方便其他程序调用
        return data
    except FileNotFoundError:
        print(f"错误：找不到文件 {file_path}")
        return None
    except json.JSONDecodeError:
        print(f"错误：文件 {file_path} 不是有效的JSON格式")
        return None
    except Exception as e:
        print(f"读取商机数据时出错：{str(e)}")
        return None

if __name__ == "__main__":
    get_business_opportunities()