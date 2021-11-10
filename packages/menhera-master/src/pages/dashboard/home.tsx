import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import DashboardLayout from '../../components/dashboard/Layout';

type Props = {
  session: Session | null;
};

export default ({ session }: Props): JSX.Element => {
  return (
    <DashboardLayout session={session}>
      <Flex w="85%" p="3%" flexDir="column" overflow="auto" minH="100vh"></Flex>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
};
