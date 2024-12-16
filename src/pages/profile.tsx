
import { GetServerSideProps } from 'next';
import { getSession, useSession, signOut } from 'next-auth/react';
import { Box, Typography, Button, Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';

const Profile = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Box textAlign="center" mt={10}>
        Bạn cần{' '}
        <NextLink href="/auth/login" passHref>
          <MuiLink color="primary">đăng nhập</MuiLink>
        </NextLink>{' '}
        để xem trang này.
      </Box>
    );
  }

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
      <Typography variant="h4" component="h1" gutterBottom>
        Thông Tin Người Dùng
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Tên:</strong> {session.user?.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Email:</strong> {session.user?.email}
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={() => signOut()}
        sx={{ mt: 4 }}
      >
        Đăng Xuất
      </Button>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: { destination: '/auth/login', permanent: false },
    };
  }

  return {
    props: {},
  };
};

export default Profile;
