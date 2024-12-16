import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Stack,
  Alert,
  AlertTitle,
  AlertIcon,
  Link as MuiLink,
} from '@mui/material';
import { signIn } from 'next-auth/react';
import NextLink from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/');
    }
  };

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
        Đăng Nhập
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl fullWidth variant="outlined" required>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth variant="outlined" required>
            <TextField
              label="Mật Khẩu"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Đăng Nhập
          </Button>

          <Typography variant="body2" align="center">
            Bạn chưa có tài khoản?{' '}
            <NextLink href="/auth/register" passHref>
              <MuiLink color="primary">Đăng Ký</MuiLink>
            </NextLink>
          </Typography>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
