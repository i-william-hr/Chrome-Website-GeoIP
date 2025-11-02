#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import socket, subprocess, requests

app = Flask(__name__)
CORS(app)

def resolve_ip(host):
    try:
        return socket.gethostbyname(host)
    except:
        return None

@app.route('/ipinfo')
def ipinfo():
    host = request.args.get('host')
    ip = resolve_ip(host)
    if not ip:
        return jsonify({"error": "invalid host"})
    try:
        r = requests.get(f"http://ip-api.com/json/{ip}").json()
        return jsonify({
            "host": host,
            "ip": ip,
            "country_code": r.get("countryCode"),
            "country_name": r.get("country"),
            "source": "ip-api.com"
        })
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/mtr')
def mtr():
    host = request.args.get('host')
    if not host:
        return jsonify({"error": "missing host"})
    cmd = ["mtr", "-r", "-c", "10", host]
    try:
        out = subprocess.check_output(cmd, text=True, stderr=subprocess.STDOUT, timeout=20)
        return jsonify({"stdout": out})
    except subprocess.CalledProcessError as e:
        return jsonify({"error": e.output})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
