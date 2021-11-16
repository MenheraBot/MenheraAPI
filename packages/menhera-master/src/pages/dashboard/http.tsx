import {
  Stack,
  Box,
  Heading,
  Icon,
  Flex,
  Text,
  Table,
  Input,
  Thead,
  ButtonGroup,
  Select,
  useToast,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tbody,
  FormLabel,
  Tr,
  Th,
  useDisclosure,
  Td,
  Wrap,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { MdHttps } from 'react-icons/md';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/Layout';
import apiRequest from '../../lib/requests';

type ActivityType = 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING';

type Activity = {
  name: string;
  type: ActivityType;
};

const AddActivityForm = ({
  setActivities,
  activities,
  onCancel,
}: {
  setActivities: Dispatch<SetStateAction<Activity[]>>;
  activities: Activity[];
  // eslint-disable-next-line @typescript-eslint/type-annotation-spacing
  onCancel: () => void;
}): JSX.Element => {
  const toast = useToast();
  const [actvName, setActvName] = useState('');
  const [actvType, setActvType] = useState('PLAYING');
  const addActivity = async () => {
    const res = await apiRequest
      .post('/v1/api/activity', { name: actvName, type: actvType })
      .then(() => {
        toast({
          title: 'Atividade Adicionada!',
          status: 'success',
          variant: 'left-accent',
          duration: 5000,
        });
        return true;
      })
      .catch(() => {
        toast({
          title: 'Erro ao Adicionar!',
          status: 'error',
          variant: 'left-accent',
          duration: 5000,
        });
        return false;
      });
    onCancel();

    if (res) setActivities([...activities, { name: actvName, type: actvType as ActivityType }]);
  };

  return (
    <Stack spacing={4}>
      <FormLabel htmlFor="name" textAlign="center">
        Name
      </FormLabel>
      <Input id="name" placeholder="tua mãe na cama" onChange={e => setActvName(e.target.value)} />

      <FormLabel htmlFor="type" textAlign="center">
        Type
      </FormLabel>
      <Select id="type" onChange={e => setActvType(e.target.value)}>
        <option value="PLAYING">Jogando</option>
        <option value="LISTENING">Ouvindo</option>
        <option value="WATCHING">Assistindo</option>
        <option value="STREAMING">Transmitindo</option>
      </Select>
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={addActivity}>
          Add
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default (): JSX.Element => {
  const [session] = useSession();
  const [activities, setActivities] = useState<Activity[]>([]);
  const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    apiRequest.get('/v1/api/activity/all').then(a => setActivities(a.data));
  }, []);

  return (
    <DashboardLayout session={session}>
      <Stack w="85%" p="3%" flexDir="column" overflow="auto" minH="100vh">
        <Box>
          <Heading color="#9c5ddb" textAlign="center">
            <Icon as={MdHttps} color="inherit" /> HTTP Requests
          </Heading>
        </Box>

        <Flex w="50%" alignContent="flex-start" flexDir="column">
          <Text textAlign="center" fontSize="30px" textColor="darkgoldenrod">
            Activities
          </Text>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Type</Th>
              </Tr>
            </Thead>
            <Tbody>
              {activities.length > 0 &&
                activities.map((a, id) => (
                  <Tr key={id}>
                    <Td>{a.name}</Td>
                    <Td>{a.type}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          <Wrap
            flexDir="row"
            mt="10px"
            alignSelf="center"
            justifyContent="space-between"
            spacing="20px"
          >
            <Popover
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              placement="right"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Button colorScheme="green">Add</Button>
              </PopoverTrigger>
              <PopoverContent>
                <AddActivityForm
                  onCancel={onClose}
                  activities={activities}
                  setActivities={setActivities}
                />
              </PopoverContent>
            </Popover>
            <Button
              colorScheme="yellow"
              onClick={async () => {
                await apiRequest.put('/v1/api/activity');
                apiRequest.get('/v1/api/activity').then(a => setActivities(a.data));
              }}
            >
              Reset
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                setActivities([]);
                apiRequest.delete('/v1/api/activity');
              }}
            >
              Delete
            </Button>
          </Wrap>
        </Flex>
      </Stack>
    </DashboardLayout>
  );
};
