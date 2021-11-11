import Icon from '@chakra-ui/icon';
import { Flex, Heading, Link, Text, Avatar } from '@chakra-ui/react';
import { User } from 'next-auth';
import { useRouter } from 'next/dist/client/router';
import { FiActivity, FiCloud, FiHome, FiMessageSquare } from 'react-icons/fi';

export default ({ user }: { user: User }): JSX.Element => {
  const router = useRouter();

  const isActive = (name: string) => name === router.pathname.split('/').pop();

  return (
    <Flex w="15%" flexDir="column" alignItems="center" backgroundColor="#020202" color="#fff">
      <Flex flexDir="column" justifyContent="space-between" h="100vh">
        <Flex flexDir="column" as="nav">
          <Heading mt={50} mb={100} fontSize="4xl" alignSelf="center" letterSpacing="tight">
            Master
          </Heading>
          <Flex flexDir="column" align="flex-start" justifyContent="center">
            <Flex className="sidebar-items">
              <Link href="/dashboard/home">
                <Icon
                  as={FiHome}
                  fontSize="2xl"
                  className={isActive('home') ? 'active-icon' : ''}
                ></Icon>
              </Link>
              <Link href="/dashboard/home" _hover={{ textDecor: 'none' }}>
                <Text className={isActive('home') ? 'active' : ''}>Home</Text>
              </Link>
            </Flex>
          </Flex>
          <Flex flexDir="column" align="flex-start" justifyContent="center">
            <Flex className="sidebar-items">
              <Link href="/dashboard/webhook" className={isActive('webhook') ? 'active-icon' : ''}>
                <Icon as={FiMessageSquare} fontSize="2xl"></Icon>
              </Link>
              <Link
                href="/dashboard/webhook"
                className={isActive('webhook') ? 'active' : ''}
                _hover={{ textDecor: 'none' }}
              >
                <Text>Webhook</Text>
              </Link>
            </Flex>
          </Flex>
          <Flex flexDir="column" align="flex-start" justifyContent="center">
            <Flex className="sidebar-items">
              <Link
                href="/dashboard/performance"
                className={isActive('performance') ? 'active-icon' : ''}
              >
                <Icon as={FiActivity} fontSize="2xl"></Icon>
              </Link>
              <Link
                href="/dashboard/performance"
                className={isActive('performance') ? 'active' : ''}
                _hover={{ textDecor: 'none' }}
              >
                <Text>Performance</Text>
              </Link>
            </Flex>
          </Flex>
          <Flex flexDir="column" align="flex-start" justifyContent="center">
            <Flex className="sidebar-items">
              <Link href="/dashboard/http" className={isActive('http') ? 'active-icon' : ''}>
                <Icon as={FiCloud} fontSize="2xl"></Icon>
              </Link>
              <Link
                href="/dashboard/http"
                className={isActive('http') ? 'active' : ''}
                _hover={{ textDecor: 'none' }}
              >
                <Text>HTTP</Text>
              </Link>
            </Flex>
          </Flex>
        </Flex>
        <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
          <Avatar my={2} src={user.image ?? ''}></Avatar>
          <Text textAlign="center">{user.name}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
