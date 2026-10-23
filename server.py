"""
EduMaster English CEFR Web Application Server
Chạy máy chủ tĩnh hỗ trợ xem và trải nghiệm ứng dụng trên trình duyệt web.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # In log truy cập ngắn gọn
        print(f"[{self.log_date_time_string()}] {format % args}")

def run_server():
    os.chdir(DIRECTORY)
    
    # Tìm port khả dụng nếu 8080 đang bận
    port = PORT
    server = None
    for p in range(PORT, PORT + 20):
        try:
            server = socketserver.TCPServer(("", p), Handler)
            port = p
            break
        except OSError:
            continue

    if not server:
        print("Lỗi: Không tìm được cổng khả dụng!")
        sys.exit(1)

    url = f"http://localhost:{port}/index.html"
    print("=" * 60)
    print("🚀  EDUMASTER ENGLISH - CEFR LEARNING PLATFORM")
    print("=" * 60)
    print(f"📡  Máy chủ đang chạy tại: {url}")
    print("🌐  Đang tự động mở trình duyệt web...")
    print("💡  Nhấn Ctrl + C để dừng máy chủ bất cứ lúc nào.")
    print("=" * 60)

    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"Không thể tự động mở trình duyệt: {e}")
        print(f"Vui lòng truy cập thủ công: {url}")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑  Đã dừng máy chủ. Tạm biệt!")
        server.server_close()

if __name__ == "__main__":
    run_server()
