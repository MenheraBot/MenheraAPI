import { Flex } from '@chakra-ui/react';
import { Session, User } from 'next-auth';
import { ReactNode } from 'react';
import Sidebar from './Sidebar';

type Props = {
  children: ReactNode;
  session: Session | null;
};

export default ({ children, session }: Props): JSX.Element => {
  return (
    <Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
      <Sidebar user={session?.user as User} />
      {children}
    </Flex>
  );
};
