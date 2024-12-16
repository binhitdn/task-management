import { Box, Flex, Link, Button, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center">
        <Box color="white" fontWeight="bold">Task Manager</Box>
        <Spacer />
        <Flex alignItems="center">
          {session ? (
            <>
              <NextLink href="/" passHref>
                <Link color="white" mr={4}>Trang Chủ</Link>
              </NextLink>
              <NextLink href="/profile" passHref>
                <Link color="white" mr={4}>Hồ Sơ</Link>
              </NextLink>
              <Button colorScheme="teal" variant="ghost" onClick={() => signOut({ callbackUrl: '/auth/login' })}>
                Đăng Xuất
              </Button>
            </>
          ) : (
            <>
              <NextLink href="/auth/login" passHref>
                <Link color="white" mr={4}>Đăng Nhập</Link>
              </NextLink>
              <NextLink href="/auth/signup" passHref>
                <Link color="white">Đăng Ký</Link>
              </NextLink>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
