# 待辦事項清單前端


##  技術棧

### 核心技術
- **React 19.1.1** - 使用函數組件和Hooks
- **TypeScript** - 提供類型安全和更好的開發體驗
- **Vite 7.1.7** - 快速的構建工具和開發服務器

### 使用者介面框架
- **Bootstrap 5.3.3** - 響應式介面設計
- **CSS** - 自定義樣式



##  主要功能

- **任務管理** - 完整的增刪改查操作（新增、讀取、修改、刪除）
- **即時更新** - 每5秒自動重新整理資料
- **排序功能** - 支援優先順序、截止日期、建立時間排序


##  API 整合

與後端 Express API 完整整合：
- `GET /tasks` - 取得任務清單（支援分頁和排序）
- `POST /tasks` - 建立新任務
- `PUT /tasks/:id` - 更新任務
- `DELETE /tasks/:id` - 刪除任務

##  安裝與執行

```bash
# 安裝相依套件
npm install

# 啟動開發伺服器
npm run dev

# 建置正式版本
npm run build

# 程式碼檢查
npm run lint
```

##  專案結構

```
src/
├── App.tsx          # 主要應用程式元件
├── App.css          # 主要樣式檔案
├── main.tsx         # 應用程式進入點
├── index.css        # 全域樣式
└── assets/          # 靜態資源
```

##  核心特色



### React Hooks 使用
- `useState` - 狀態管理
- `useEffect` - 副作用處理（API 呼叫、計時器）



##  即時功能

使用 `setInterval` 實現自動重新整理機制，確保資料同步：
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    fetchTasks()
  }, 5000)
  
  return () => clearInterval(interval)
}, [currentPage, sortBy, sortOrder])
```

## 🤖 AI 協助開發聲明

此專案在開發過程中使用了生成式 AI 工具協助：

### AI 協助範圍
- **前端切版設計** - 使用 Bootstrap 的響應式表格佈局和 UI 元件設計
- **CSS 樣式規劃** - 包含表格樣式、按鈕設計、分頁元件等視覺呈現
- **使用者介面優化** - 排序功能的視覺指示、狀態切換的互動設計
- **響應式設計實作** - 適配不同螢幕尺寸的佈局調整

### 開發者貢獻
- 整體架構設計與技術選型
- 業務邏輯實作
- API 整合與資料流程
- 功能需求分析與實作策略