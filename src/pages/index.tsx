import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Stack,
  Checkbox,
  IconButton,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios';
import 

import Task from '../models/Task'; 

type ITask = {
  _id: string;
  userId: string;
  category: string;
  title: string;
  description: string;
  dueDate: string | null;
  isCompleted: boolean;
};

interface HomeProps {
  initialTasks: ITask[];
}

const Home = ({ initialTasks }: HomeProps) => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<ITask[]>(initialTasks);
  const [newTask, setNewTask] = useState({
    category: '',
    title: '',
    description: '',
    dueDate: '',
  });

  const [filter, setFilter] = useState<{ category: string; isCompleted: string }>({
    category: '',
    isCompleted: '',
  });

  const addTask = async () => {
    if (!newTask.title || !newTask.category) {
      alert('Vui lòng nhập tiêu đề và danh mục cho công việc.');
      return;
    }

    try {
      const response = await axios.post('/api/tasks', {
        ...newTask,
        isCompleted: false,
        userId: session?.user.id,
      });

      setTasks([...tasks, response.data]);
      setNewTask({
        category: '',
        title: '',
        description: '',
        dueDate: '',
      });
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Đã có lỗi xảy ra khi thêm công việc.');
    }
  };

  // Hàm chuyển đổi trạng thái hoàn thành
  const toggleCompletion = async (taskId: string) => {
    try {
      const updatedTask = await axios.patch(`/api/tasks/${taskId}`, {
        isCompleted: !tasks.find(task => task._id === taskId)?.isCompleted,
      });

      setTasks(tasks.map(task => (task._id === taskId ? updatedTask.data : task)));
    } catch (error) {
      console.error('Error toggling completion:', error);
      alert('Đã có lỗi xảy ra khi cập nhật công việc.');
    }
  };

  // Hàm xóa công việc
  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Đã có lỗi xảy ra khi xóa công việc.');
    }
  };

  // Hàm chỉnh sửa công việc (có thể triển khai thêm)
  const editTask = (taskId: string) => {
    // Triển khai logic chỉnh sửa công việc tại đây
    alert(`Chỉnh sửa công việc với ID: ${taskId}`);
  };

  const filteredTasks = tasks.filter(task => {
    const categoryMatch = filter.category ? task.category === filter.category : true;
    const completionMatch = filter.isCompleted
      ? filter.isCompleted === 'completed'
        ? task.isCompleted
        : !task.isCompleted
      : true;
    return categoryMatch && completionMatch;
  });

  return (
    <Box maxWidth="xl" mx="auto" mt={10} p={6} border={1} borderColor="grey.300" borderRadius={2}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Task Manager
      </Typography>

      {/* Thêm Công Việc Mới */}
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 4 }}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="category-label">Danh Mục</InputLabel>
          <Select
            labelId="category-label"
            label="Danh Mục"
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
          >
            <MenuItem value="Japanese">Japanese</MenuItem>
            <MenuItem value="Dev Skills">Dev Skills</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Tiêu Đề"
          variant="outlined"
          margin="normal"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />

        <TextField
          fullWidth
          label="Mô Tả"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />

        <TextField
          fullWidth
          label="Ngày Hạn"
          type="date"
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addTask}
          sx={{ mt: 2 }}
        >
          Thêm Công Việc
        </Button>
      </Box>

      {/* Bộ Lọc Công Việc */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} mb={6} sx={{ mt: 4 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="filter-category-label">Lọc theo danh mục</InputLabel>
          <Select
            labelId="filter-category-label"
            label="Lọc theo danh mục"
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <MenuItem value="">
              <em>Tất cả</em>
            </MenuItem>
            <MenuItem value="Japanese">Japanese</MenuItem>
            <MenuItem value="Dev Skills">Dev Skills</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel id="filter-status-label">Lọc theo trạng thái</InputLabel>
          <Select
            labelId="filter-status-label"
            label="Lọc theo trạng thái"
            value={filter.isCompleted}
            onChange={(e) => setFilter({ ...filter, isCompleted: e.target.value })}
          >
            <MenuItem value="">
              <em>Tất cả</em>
            </MenuItem>
            <MenuItem value="completed">Đã hoàn thành</MenuItem>
            <MenuItem value="pending">Chưa hoàn thành</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setFilter({ category: '', isCompleted: '' })}
          sx={{ height: '56px' }}
        >
          Xóa Bộ Lọc
        </Button>
      </Stack>

      {/* Danh Sách Công Việc */}
      <Stack spacing={4}>
        {filteredTasks.map(task => (
          <Box
            key={task._id}
            display="flex"
            alignItems="center"
            p={2}
            border={1}
            borderColor="grey.300"
            borderRadius={2}
          >
            <Checkbox
              checked={task.isCompleted}
              onChange={() => toggleCompletion(task._id)}
              sx={{ mr: 2 }}
              color="primary"
            />

            <Box flexGrow={1}>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                }}
              >
                {task.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {task.description}
              </Typography>
              {task.dueDate && (
                <Typography variant="body2" color="textSecondary">
                  Ngày Hạn: {new Date(task.dueDate).toLocaleDateString()}
                </Typography>
              )}
            </Box>

            <IconButton
              color="primary"
              onClick={() => editTask(task._id)}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>

            <IconButton
              color="secondary"
              onClick={() => deleteTask(task._id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: { initialTasks: [] },
    };
  }

  await connectMongo();

  const tasks = await Task.find({ userId: session.user.id }).lean();

  const initialTasks = tasks.map(task => ({
    ...task,
    _id: task._id.toString(),
    userId: task.userId.toString(),
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
  }));

  return {
    props: { initialTasks },
  };
};

export default Home;
