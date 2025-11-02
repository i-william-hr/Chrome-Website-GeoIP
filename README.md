# 🌍 GeoIP + Browser Country Badge

Shows the **country of any website's IP address** right in your Chrome toolbar. Not for production use. Not always accurate. Has MTR from server to verify

Includes:
- Flask backend (`geo.py`)
- Chrome extension (`extension/` folder)
- `start-geo.sh` script to run the backend in screen

### Install dependencies
```bash
apt install python3 python3-pip screen python3-flask python3-requests
pip3 install flask flask-cors requests
```

### Run the backend
```bash
python3 geo.py
```
or
```bash
chmod +x start-geo.sh
./start-geo.sh
```

Then open in browser:
```
http://127.0.0.1:5050/ipinfo?host=google.com
```

### Load the Chrome Extension
1. Go to `chrome://extensions`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the `extension/` folder

The badge shows the country code; popup shows flag, IP, and MTR option.
