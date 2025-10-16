import datetime
from typing import List, Dict
from flask import Flask, Response, jsonify
from datetime import datetime

import sys
from twitch_parser import parse_twitch_streamers
sys.stdout.reconfigure(line_buffering=True)

app = Flask(__name__)

@app.route('/test')
def test():
    return jsonify({"ok": True})

@app.route('/parse', methods=['GET'])
def parse_route_jsonify():
    try:
        print("Received GET request to /parse at ", datetime.now())
        raw_data = parse_twitch_streamers()
        print(f"Parsed {len(raw_data)} streamers")
        return jsonify({"data": raw_data, "count": len(raw_data)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__': 
    app.run(host="0.0.0.0", port=6969, debug=True, threaded=True)