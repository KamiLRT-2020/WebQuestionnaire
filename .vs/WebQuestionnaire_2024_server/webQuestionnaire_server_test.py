from flask import Flask, jsonify, request
import csv
import itertools
import random
import os
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# CSV 文件路径
CSV_FILE = "method_permutations.csv"

# 9 种方法
METHODS = ["AA", "AB", "AC", "BA", "BB", "BC", "CA", "CB", "CC"]

PREFIX = "Result_"
EXTENSION = ".csv"

# 生成所有方法的排列组合
def generate_permutations():
    return list(itertools.permutations(METHODS))  # 生成所有可能的排列

# 初始化 CSV 文件（如果不存在）
def initialize_csv():
    if not os.path.exists(CSV_FILE):
        with open(CSV_FILE, mode="w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(["combination", "count"])  # 写入表头
            for perm in generate_permutations():
                writer.writerow(["-".join(perm), 0])  # 组合转为字符串存入

# 读取 CSV 数据
def read_csv():
    data = []
    with open(CSV_FILE, mode="r") as file:
        reader = csv.reader(file)
        next(reader)  # 跳过表头
        for row in reader:
            data.append([row[0], int(row[1])])  # 读取组合和计数
    return data

# 选择出现次数最少的排列组合
def select_least_used_combination(data):
    if not data:
        return None  # 防止空数据报错
    
    min_count = min(data, key=lambda x: x[1])[1]  # 找到最小次数
    least_used = [combo for combo in data if combo[1] == min_count]  # 筛选所有最少次数的组合
    return random.choice(least_used) if least_used else None  # 避免空列表

# 更新 CSV 记录
def update_csv(selected_combination):
    data = read_csv()
    for row in data:
        if row[0] == selected_combination:
            row[1] += 1
            break
    with open(CSV_FILE, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["combination", "count"])  # 写入表头
        writer.writerows(data)

# 获取当前目录下所有匹配的文件
def get_latest_file_number():
    max_number = 0  # 初始值为 0
    for filename in os.listdir():  # 遍历当前目录
        match = re.match(rf"{PREFIX}(\d+){EXTENSION}", filename)  # 匹配 Result_x.csv 格式
        if match:
            number = int(match.group(1))  # 提取数字部分
            max_number = max(max_number, number)  # 记录最大编号
    return max_number + 1  # 返回新的编号

# 处理前端请求，获取排列组合
@app.route("/lian_qserver/get_combination", methods=["GET"])
def get_combination():
    initialize_csv()  # 确保 CSV 存在
    data = read_csv()  # 读取数据
    
    if not data:  # 如果数据为空
        return jsonify({"error": "No data available"}), 400
    
    selected_entry = select_least_used_combination(data)
    
    if selected_entry:
        combination, _ = selected_entry
        combination_array = combination.split("-")  # 🔹 将 "AA-AB-AC-BA..." 转换为数组
        return jsonify({"combination": combination_array})
    else:
        return jsonify({"error": "No valid combination found"}), 400

@app.route('/lian_qserver/collect-result', methods=['POST'])
def collect_reslt():
    try:
            # 获取传来的 JSON 数据
            data = request.get_json()
            text = data.get('text')
            combination = data.get("combination")

            if combination:
                if isinstance(combination, list):  # 确保 combination 是列表
                    combination = "-".join(combination)  # 转换成 "AA-BB-..." 形式

                update_csv(combination)  # 现在 combination 变为正确格式
            else:
                return jsonify({"error": "Invalid data"}), 400

            if text:
                # 生成新的文件名
                new_number = get_latest_file_number()
                new_filename = f"{PREFIX}{new_number}{EXTENSION}"
                with open(new_filename, mode="a+", newline="") as file:
                        writer = csv.writer(file)
                        writer.writerow([new_number]);
                        writer.writerow([combination])  # 将文本写入新的一行
                        writer.writerow([text])  # 将文本写入新的一行

                return jsonify({"message": "Result saved successfully!"}), 200
            else:
                return jsonify({"message": "Not avaible result!"}), 400
    except Exception as e:
            return jsonify({"message": f"Error: {str(e)}"}), 500
        
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=30058, debug=True)
