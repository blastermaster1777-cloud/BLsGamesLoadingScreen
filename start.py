import http.server
import socketserver
import socket
import sys
import os
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8090
DIRECTORY = sys.argv[2] if len(sys.argv) > 2 else os.getcwd()

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1"
    finally:
        s.close()
    return ip

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    local_ip = get_local_ip()
    server = ThreadingHTTPServer(("", PORT), Handler)
    print(f"Serving directory: {DIRECTORY}")
    print(f"Local:   http://localhost:{PORT}/")
    print(f"LAN:     http://{local_ip}:{PORT}/")
    print("Press Ctrl+C to stop")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down...")
        server.server_close()
