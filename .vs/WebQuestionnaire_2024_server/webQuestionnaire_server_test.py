from flask import Flask, jsonify, request
import csv
import itertools
import random
import os
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

# ================================
# ====== 配置区 ======
# ================================
METHODS = ["PA", "RP","PR"]
CSV_FILE = "method_permutations.csv"
PREFIX = "Result_"
EXTENSION = ".csv"
NUMBER_COMB_N = 3  # 🔧 固定数字组合长度 N（不包含头部随机数）


# ================================
# ====== 通用函数 ======
# ================================

def get_latest_file_number():
    max_number = 0
    for filename in os.listdir():
        match = re.match(rf"{PREFIX}(\d+){EXTENSION}", filename)
        if match:
            number = int(match.group(1))
            max_number = max(max_number, number)
    return max_number + 1


# ================================
# ====== METHOD 模式函数 ======
# ================================

def generate_method_permutations():
    return list(itertools.permutations(METHODS))

def initialize_method_csv():
    if not os.path.exists(CSV_FILE):
        with open(CSV_FILE, mode="w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(["combination", "count"])
            for perm in generate_method_permutations():
                writer.writerow(["-".join(perm), 0])

def read_method_csv():
    data = []
    with open(CSV_FILE, mode="r") as file:
        reader = csv.reader(file)
        next(reader)
        for row in reader:
            data.append([row[0], int(row[1])])
    return data

def select_least_used_method_combination(data):
    if not data:
        return None
    min_count = min(data, key=lambda x: x[1])[1]
    least_used = [combo for combo in data if combo[1] == min_count]
    return random.choice(least_used) if least_used else None

def update_method_csv(selected_combination):
    data = read_method_csv()
    for row in data:
        if row[0] == selected_combination:
            row[1] += 1
            break
    with open(CSV_FILE, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["combination", "count"])
        writer.writerows(data)


# ================================
# ====== 数字排列函数 ======
# ================================

def get_number_csv_filename(n):
    return f"number_permutations_{n}.csv"

def initialize_number_csv(n):
    filename = get_number_csv_filename(n)
    if not os.path.exists(filename):
        with open(filename, mode="w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(["combination", "count"])

def read_number_csv(n):
    filename = get_number_csv_filename(n)
    data = []
    if os.path.exists(filename):
        with open(filename, mode="r") as file:
            reader = csv.reader(file)
            next(reader)
            for row in reader:
                data.append([row[0], int(row[1])])
    return data

def update_number_csv(n, combination, allow_insert=False):
    filename = get_number_csv_filename(n)
    data = read_number_csv(n)
    updated = False

    for row in data:
        if row[0] == combination:
            row[1] += 1
            updated = True
            break

    if not updated and allow_insert:
        data.append([combination, 1])

    with open(filename, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["combination", "count"])
        writer.writerows(data)


# ================================
# ====== 合并接口：返回所有组合 ======
# ================================

@app.route("/lian_qserver/get_all_combination", methods=["GET"])
def get_all_combination():
    try:
        n = NUMBER_COMB_N

        # 1. METHOD 组合
        initialize_method_csv()
        method_data = read_method_csv()
        method_comb_array = []
        if method_data:
            selected_method = select_least_used_method_combination(method_data)
            if selected_method:
                method_comb_array = selected_method[0].split("-")

        # 2. 随机数头部 + 数字排列
        rand_head = random.randint(0, n - 1)
        base_perms = list(itertools.permutations(range(n)))
        base_perm = random.choice(base_perms)
        full_combination = [rand_head] + list(base_perm)

        # 3. number_combination 只记录后半部分
        number_combination = full_combination[1:]  # 去掉头部部分，保留剩余的排列

        initialize_number_csv(len(full_combination))

        return jsonify({
            "combination": method_comb_array,
            "number_combination": list(map(str, number_combination)),  # 只返回剩余部分
            "random_number": rand_head
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# ================================
# ====== 结果收集 ======
# ================================

@app.route('/lian_qserver/collect-result', methods=['POST'])
def collect_result():
    try:
        data = request.get_json()
        text = data.get('text')
        combination = data.get("combination")
        number_combination = data.get("number_combination")

        # 方法组合处理
        if combination:
            if isinstance(combination, list):
                combination_str = "-".join(combination)
            else:
                combination_str = str(combination)
            if any(re.match(r"[A-Z]+", item) for item in combination_str.split("-")):
                update_method_csv(combination_str)
        else:
            combination_str = ""

        # 数字组合处理
        if number_combination:
            if isinstance(number_combination, list):
                number_combination_str = "-".join(number_combination)
            else:
                number_combination_str = str(number_combination)
            if all(re.match(r"^\d+$", item) for item in number_combination_str.split("-")):
                update_number_csv(len(number_combination_str.split("-")), number_combination_str, allow_insert=True)
        else:
            number_combination_str = ""

        # 保存文本结果
        if text:
            new_number = get_latest_file_number()
            new_filename = f"{PREFIX}{new_number}{EXTENSION}"
            with open(new_filename, mode="a+", newline="") as file:
                writer = csv.writer(file)
                writer.writerow([new_number])
                writer.writerow(["Method Combination", combination_str])
                writer.writerow(["Number Combination", number_combination_str])
                writer.writerow(["Text", text])
            return jsonify({"message": "Result saved successfully!"}), 200
        else:
            return jsonify({"message": "No result content provided!"}), 400
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500


# ================================
# ====== 启动 Flask ======
# ================================
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=30058, debug=True)
