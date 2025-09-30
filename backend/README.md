# TypeScript + Express.js 後端 API


## 專案結構

```
backend/
├── src/
│   ├── routes/          # API 路由
│   │   └── index.ts     # 健康檢查路由
│   ├── app.ts          # Express 應用程式設定
│   └── server.ts       # 伺服器啟動檔案
├── tsconfig.json       # TypeScript 配置
└── package.json        # 專案依賴
```

## 安裝與啟動

1. 安裝依賴：
```bash
npm install
```

2. 啟動開發伺服器：
```bash
npm run dev
```

3. 建置專案：
```bash
npm run build
```

4. 啟動生產伺服器：
```bash
npm start
```

## API 端點

### 健康檢查
- `GET /health` - 檢查 API 狀態

## API 使用範例

### 健康檢查
```bash
curl http://localhost:3000/health
```

回應：
```json
{
  "status": "OK",
  "message": "API 運行正常",
  "timestamp": "2025-09-30T01:16:38.081Z"
}
```

## 技術特色

- **TypeScript**: 提供型別安全
- **Express.js**: 輕量級 web 框架
- **CORS**: 跨域請求支援

## 開發環境

- Node.js
- TypeScript

## 開發歷程

 **使用 Claude Code 進行開發**
- 此專案由  Claude Code 協助開發

