
#from http.server import HTTPServer, BaseHTTPRequestHandler
#import json

#data = {'result': 'this is a test'}
#host = ('localhost', 45557)


##class Resquest(BaseHTTPRequestHandler):
##    def do_GET(self):
##        self.send_response(200)
##        self.send_header('Content-type', 'application/json')
##        self.end_headers()
##        #self.wfile.write(json.dumps(data).encode())

##    def do_POST(self):
##        datas = self.rfile.read(int(self.headers['content-length']))

##        print('headers', self.headers)
##        print("do post:", self.path, self.client_address, datas)

#if __name__ == '__main__':
#    server = HTTPServer(host, Resquest)
#    print("Starting server, listen at: %s:%s" % host)
#    server.serve_forever()

from cProfile import label
from re import L
from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
import re


app = Flask(__name__)
CORS(app)

@app.route('/lian_qserver/get-number', methods=['GET'])
def get_number():
    with open('QuestionnaireIndexFile.csv', mode='r', newline='') as file:
        csv_reader = csv.reader(file)
        rows = list(csv_reader)  # 将 CSV 内容读入列表
    
        # 获取最后一行（跳过表头）
        last_row = rows[-1]
    
        # 获取最后一行的数字 (假设数字在第三列)
        last_value = int(last_row[0])
    
        # 计算新的数字
        a = last_value + 1
    return jsonify({'a': a})  # 以 JSON 格式返回

@app.route('/lian_qserver/collect-result', methods=['POST'])
def collect_reslt():
    try:
            # 获取传来的 JSON 数据
            data = request.get_json()
            text = data.get('text')

            if text:

                match = re.search(r'\d+', text)  # 查找第一个数字
                if match:
                    QuestionnaireIndex = match.group()

                with open('QuestionnaireIndexFile.csv', mode='r', newline='') as file:
                    csv_reader = csv.reader(file)
                    rows = list(csv_reader)  # 将 CSV 内容读入列表
    
                    # 获取最后一行（跳过表头）
                    last_row = rows[-1]
    
                    # 获取最后一行的数字 (假设数字在第三列)
                    last_value = int(last_row[0])
    
                    if last_value < int(QuestionnaireIndex):
                        # 将新的一行写入 CSV 文件
                        with open('QuestionnaireIndexFile.csv', mode='a', newline='') as file:
                            csv_writer = csv.writer(file)

                            # 构建新的一行数据
                            new_row = [QuestionnaireIndex]
    
                            # 写入新的一行
                            csv_writer.writerow(new_row)

                # 打开 CSV 文件并追加内容
                with open(f'Result_{QuestionnaireIndex}.csv', mode='a+', newline='') as file:
                    writer = csv.writer(file)
                    writer.writerow([text])  # 将文本写入新的一行

                return jsonify({"message": "Text saved successfully!"}), 200
            else:
                return jsonify({"message": "No text provided!"}), 400

    except Exception as e:
            return jsonify({"message": f"Error: {str(e)}"}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0',port=30058)