import { useState, useEffect } from 'react'
import './App.css'

interface Task {
  id: number
  task: string
  priority: 'High' | 'Medium' | 'Low'
  deadline: string | null
  isDone: boolean
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: Task[]
  pagination?: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
}

const API_BASE_URL = 'http://localhost:3000'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState({
    task: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    deadline: ''
  })
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC')

  useEffect(() => {
    fetchTasks()
  }, [currentPage, sortBy, sortOrder])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTasks()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentPage, sortBy, sortOrder])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/tasks?page=${currentPage}&limit=10&sortBy=${sortBy}&sortOrder=${sortOrder}`)
      const result: ApiResponse = await response.json()
      if (result.success) {
        setTasks(result.data)
        if (result.pagination) {
          setTotalPages(result.pagination.totalPages)
        }
      }
    } catch (error) {
      console.error('獲取任務失敗:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async () => {
    if (!newTask.task.trim()) return

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task: newTask.task,
          priority: newTask.priority,
          deadline: newTask.deadline || null
        })
      })
      
      if (response.ok) {
        setNewTask({ task: '', priority: 'Medium', deadline: '' })
        setShowAddForm(false)
        fetchTasks()
      }
    } catch (error) {
      console.error('創建任務失敗:', error)
    }
  }

  const updateTask = async (task: Task) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      
      if (response.ok) {
        setEditingTask(null)
        fetchTasks()
      }
    } catch (error) {
      console.error('更新任務失敗:', error)
    }
  }

  const deleteTask = async (id: number) => {
    if (!confirm('確定要刪除這個任務嗎？')) return

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchTasks()
      }
    } catch (error) {
      console.error('刪除任務失敗:', error)
    }
  }

  const toggleTaskDone = async (task: Task) => {
    await updateTask({ ...task, isDone: !task.isDone })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'danger'
      case 'Medium': return 'warning'
      case 'Low': return 'info'
      default: return 'secondary'
    }
  }

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
    } else {
      setSortBy(field)
      setSortOrder('DESC')
    }
    setCurrentPage(1)
  }

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return '↕️'
    return sortOrder === 'ASC' ? '↑' : '↓'
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Todo List</h1>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? '取消' : '添加任務'}
            </button>
            <button 
              className="btn btn-outline-secondary"
              onClick={fetchTasks}
              disabled={loading}
            >
              {loading ? '載入中...' : '刷新'}
            </button>
          </div>

          {showAddForm && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">添加新任務</h5>
                <div className="mb-3">
                  <label className="form-label">任務內容</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newTask.task}
                    onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                    placeholder="輸入任務內容..."
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">優先級</label>
                    <select
                      className="form-select"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                    >
                      <option value="Low">低</option>
                      <option value="Medium">中</option>
                      <option value="High">高</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">截止日期</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newTask.deadline}
                      onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-success me-2" onClick={createTask}>
                    創建任務
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                    取消
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">載入中...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">狀態</th>
                      <th scope="col">任務內容</th>
                      <th scope="col" role="button" onClick={() => handleSort('priority')} className="user-select-none">
                        優先級 {getSortIcon('priority')}
                      </th>
                      <th scope="col" role="button" onClick={() => handleSort('deadline')} className="user-select-none">
                        截止日期 {getSortIcon('deadline')}
                      </th>
                      <th scope="col" role="button" onClick={() => handleSort('createdAt')} className="user-select-none">
                        創建時間 {getSortIcon('createdAt')}
                      </th>
                      <th scope="col">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id} className={task.isDone ? 'table-secondary' : ''}>
                        <td>
                          <button
                            className={`btn btn-sm ${task.isDone ? 'btn-warning' : 'btn-success'}`}
                            onClick={() => toggleTaskDone(task)}
                          >
                            {task.isDone ? '✓' : '○'}
                          </button>
                        </td>
                        <td>
                          {editingTask?.id === task.id ? (
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={editingTask.task}
                              onChange={(e) => setEditingTask({ ...editingTask, task: e.target.value })}
                            />
                          ) : (
                            <span className={task.isDone ? 'text-decoration-line-through text-muted' : ''}>
                              {task.task}
                            </span>
                          )}
                        </td>
                        <td>
                          {editingTask?.id === task.id ? (
                            <select
                              className="form-select form-select-sm"
                              value={editingTask.priority}
                              onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                            >
                              <option value="Low">低</option>
                              <option value="Medium">中</option>
                              <option value="High">高</option>
                            </select>
                          ) : (
                            <span className={`badge bg-${getPriorityColor(task.priority)}`}>
                              {task.priority === 'High' ? '高' : task.priority === 'Medium' ? '中' : '低'}
                            </span>
                          )}
                        </td>
                        <td>
                          {editingTask?.id === task.id ? (
                            <input
                              type="date"
                              className="form-control form-control-sm"
                              value={editingTask.deadline ? editingTask.deadline.split('T')[0] : ''}
                              onChange={(e) => setEditingTask({ ...editingTask, deadline: e.target.value || null })}
                            />
                          ) : (
                            task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'
                          )}
                        </td>
                        <td>
                          <small className="text-muted">
                            {new Date(task.createdAt).toLocaleDateString()}
                          </small>
                        </td>
                        <td>
                          {editingTask?.id === task.id ? (
                            <div className="btn-group" role="group">
                              <button 
                                className="btn btn-success btn-sm" 
                                onClick={() => updateTask(editingTask)}
                              >
                                保存
                              </button>
                              <button 
                                className="btn btn-secondary btn-sm" 
                                onClick={() => setEditingTask(null)}
                              >
                                取消
                              </button>
                            </div>
                          ) : (
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => setEditingTask(task)}
                              >
                                編輯
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => deleteTask(task.id)}
                              >
                                刪除
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {tasks.length === 0 && (
                  <div className="text-center p-4">
                    <p className="text-muted">暫無任務，點擊「添加任務」創建新任務</p>
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        上一頁
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        下一頁
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
