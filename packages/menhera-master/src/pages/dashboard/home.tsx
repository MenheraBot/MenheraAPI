import { Stack, Box, Heading } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import DashboardLayout from '../../components/dashboard/Layout';

export default (): JSX.Element => {
  const [session] = useSession();

  return (
    <DashboardLayout session={session}>
      <Stack w="85%" p="3%" flexDir="column" overflow="auto" minH="100vh">
        <Box>
          <Heading color="#9c5ddb">Bem Vinda de Volta, {session?.user?.name ?? ''}.</Heading>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};
