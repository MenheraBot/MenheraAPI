import Icon from '@chakra-ui/icon';
import { Flex, Heading, Link, Text, Avatar } from '@chakra-ui/react';
import { User } from 'next-auth';
import { FiActivity, FiCloud, FiHome, FiMessageSquare } from 'react-icons/fi';

export default ({ user }: { user: User }): JSX.Element => (
  <Flex w="15%" flexDir="column" alignItems="center" backgroundColor="#020202" color="#fff">
    <Flex flexDir="column" justifyContent="space-between" h="100vh">
      <Flex flexDir="column" as="nav">
        <Heading mt={50} mb={100} fontSize="4xl" alignSelf="center" letterSpacing="tight">
          Master
        </Heading>
        <Flex flexDir="column" align="flex-start" justifyContent="center">
          <Flex className="sidebar-items">
            <Link href="/dashboard/home">
              <Icon as={FiHome} fontSize="2xl" className="active-icon"></Icon>
            </Link>
            <Link href="/dashboard/home" _hover={{ textDecor: 'none' }}>
              <Text className="active">Home</Text>
            </Link>
          </Flex>
        </Flex>
        <Flex flexDir="column" align="flex-start" justifyContent="center">
          <Flex className="sidebar-items">
            <Link href="/dashboard/webhook">
              <Icon as={FiMessageSquare} fontSize="2xl"></Icon>
            </Link>
            <Link href="/dashboard/webhook" _hover={{ textDecor: 'none' }}>
              <Text>Webhook</Text>
            </Link>
          </Flex>
        </Flex>
        <Flex flexDir="column" align="flex-start" justifyContent="center">
          <Flex className="sidebar-items">
            <Link href="/dashboard/performance">
              <Icon as={FiActivity} fontSize="2xl"></Icon>
            </Link>
            <Link href="/dashboard/performance" _hover={{ textDecor: 'none' }}>
              <Text>Performance</Text>
            </Link>
          </Flex>
        </Flex>
        <Flex flexDir="column" align="flex-start" justifyContent="center">
          <Flex className="sidebar-items">
            <Link href="/dashboard/http">
              <Icon as={FiCloud} fontSize="2xl"></Icon>
            </Link>
            <Link href="/dashboard/http" _hover={{ textDecor: 'none' }}>
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
