// 使用http模組
const http = require("http");
// 引入文件系統模組
const fs = require("fs");
// 引入路徑模組
const path = require("path");

// 創造伺服器
const server = http.createServer((req, res) => {
  // 根據用戶端請求的網址，伺服器回應相對的文件
  // 文件路徑= 當前資料夾 + 'public' + 根路由請回傳index.html
  // 非根路由請回傳請求網址(/style.css 或 /index.js)
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  // 取得文件副檔名file extension
  const extname = path.extname(filePath);
  // 讓server正確切換內容類型，讓瀏覽器可以正確解讀
  let contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "application/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
  }
  // 透過fs模組讀取文件並回應給瀏覽器，以及錯誤處理
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // 文件不存在
      if (err.code == "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Not Found");
        // 其他錯誤
      } else {
        res.writeHead(500);
        res.end("Internal Server Error: " + err.code);
      }
    } else {
      // 沒有錯誤
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
