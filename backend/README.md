# TypeScript + Express.js 後端 API


## 專案結構

```
backend/
├── src/
│   ├── config/          # 配置檔案
│   │   └── database.ts  # 資料庫配置
│   ├── controllers/     # 控制器
│   │   └── taskController.ts  # 任務控制器
│   ├── entities/        # 資料實體
│   │   └── Task.ts      # 任務實體
│   ├── middleware/      # 中間件
│   │   ├── errorHandler.ts  # 錯誤處理
│   │   └── validation.ts    # 資料驗證
│   ├── routes/          # API 路由
│   │   └── index.ts     # 路由定義
│   ├── schemas/         # 驗證 Schema
│   │   └── taskSchemas.ts   # 任務驗證規則
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

### 任務管理 (Tasks)
- `GET /tasks` - 獲取任務列表 (支援分頁和排序)
- `GET /tasks/:id` - 獲取特定任務
- `POST /tasks` - 創建新任務
- `PUT /tasks/:id` - 更新任務
- `DELETE /tasks/:id` - 刪除任務

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

### 任務操作

#### 獲取任務列表 (支援分頁和排序)
```bash
# 基本查詢
curl http://localhost:3000/tasks

# 分頁查詢
curl "http://localhost:3000/tasks?page=1&limit=5"

# 排序查詢
curl "http://localhost:3000/tasks?sortBy=priority&sortOrder=ASC"
curl "http://localhost:3000/tasks?sortBy=deadline&sortOrder=DESC"
curl "http://localhost:3000/tasks?sortBy=createdAt&sortOrder=ASC"
```

**可用的排序欄位 (sortBy)**：
- `createdAt` - 創建時間 (預設)
- `updatedAt` - 更新時間
- `deadline` - 截止日期
- `priority` - 優先級 (High > Medium > Low)
- `task` - 任務名稱
- `isDone` - 完成狀態

**排序方向 (sortOrder)**：
- `DESC` - 降序 (預設)
- `ASC` - 升序

#### 創建任務
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "task": "完成專案文件",
    "priority": "High",
    "deadline": "2025-10-15"
  }'
```

#### 更新任務
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "task": "完成專案文件修訂",
    "isDone": true
  }'
```

#### 刪除任務
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## 資料模型

### Task 實體
```typescript
{
  id: number;           // 任務 ID (自動生成)
  task: string;         // 任務內容
  priority: 'High' | 'Medium' | 'Low';  // 優先級
  deadline: Date | null;  // 截止日期 (可選)
  isDone: boolean;      // 完成狀態
  createdAt: Date;      // 創建時間
  updatedAt: Date;      // 更新時間
}
```

## 技術特色

- **TypeScript**: 提供型別安全
- **Express.js**: 輕量級 web 框架
- **TypeORM**: ORM 資料庫操作
- **Joi**: 資料驗證


## 開發環境

- Node.js
- TypeScript

## 開發歷程

**使用 Claude Code 進行開發**
- 此專案由 Claude Code 協助開發
- **分頁和排序功能由 AI 產出**: 包含自定義優先級排序邏輯 (High > Medium > Low) 和完整的分頁查詢功能


