
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  TextField,
  FormControl,
  Typography,
  Stack,
  Alert,
  AlertTitle,
  AlertIcon,
  Link as MuiLink,
} from '@mui/material';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên là bắt buộc'),
      email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
      password: Yup.string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .required('Mật khẩu là bắt buộc'),
    }),
    onSubmit: async (values) => {
      setError(null);
      try {
        const res = await axios.post('/api/auth/signup', values);
        alert(res.data.message);
        router.push('/auth/login');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Có lỗi xảy ra');
      }
    },
  });

  return (
    <Box
      maxWidth="sm"
      mx="auto"
      mt={10}
      p={6}
      border={1}
      borderColor="grey.300"
      borderRadius={2}
      boxShadow={3}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Đăng Ký
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <FormControl fullWidth variant="outlined" required>
            <TextField
              id="name"
              name="name"
              label="Tên"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </FormControl>

          <FormControl fullWidth variant="outlined" required>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </FormControl>

          <FormControl fullWidth variant="outlined" required>
            <TextField
              id="password"
              name="password"
              label="Mật Khẩu"
              type="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Đăng Ký
          </Button>

          <Typography variant="body2" align="center">
            Bạn đã có tài khoản?{' '}
            <NextLink href="/auth/login" passHref>
              <MuiLink color="primary">Đăng Nhập</MuiLink>
            </NextLink>
          </Typography>
        </Stack>
      </form>
    </Box>
  );
};

export default SignUp;
