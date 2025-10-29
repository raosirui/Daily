import os

# 重命名文件函数
def rename_files():
    # 定义需要重命名的文件映射
    file_mapping = {
        '2025-10-28_admin.json': '20251028_admin.json',
        '2025-10-29_admin.json': '20251029_admin.json'
    }
    
    for old_name, new_name in file_mapping.items():
        if os.path.exists(old_name):
            try:
                os.rename(old_name, new_name)
                print(f"已将 {old_name} 重命名为 {new_name}")
            except Exception as e:
                print(f"重命名 {old_name} 时出错: {e}")
        else:
            print(f"文件 {old_name} 不存在")

if __name__ == "__main__":
    rename_files()