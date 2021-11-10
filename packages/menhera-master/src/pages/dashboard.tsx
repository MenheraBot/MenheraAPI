import { Flex } from '@chakra-ui/react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/client';
import Sidebar from '../components/Sidebar';

export default (): JSX.Element => {
  const [session] = useSession();

  return (
    <Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
      <Sidebar user={session?.user as User} />
      <Flex w="85%" p="3%" flexDir="column" overflow="auto" minH="100vh"></Flex>
    </Flex>
  );
};
