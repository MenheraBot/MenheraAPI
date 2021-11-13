/* eslint-disable camelcase */
import {
  Stack,
  Box,
  Heading,
  Icon,
  Flex,
  FormErrorMessage,
  FormLabel,
  Select,
  FormHelperText,
  Text,
  useToast,
  FormControl,
  Input,
  Button,
  useBoolean,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { useForm } from 'react-hook-form';
import { FiBell, FiXCircle, FiCheck } from 'react-icons/fi';
import { DiscordMessage, DiscordMessages, DiscordMention } from '@danktuary/react-discord-message';
import { useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../../components/dashboard/Layout';

type Props = {
  session: Session | null;
};

export default ({ session }: Props): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');
  const [messageId, setMessageId] = useState('');
  const [mention, setMention] = useBoolean(false);

  const availableStatus = {
    programmed: '🔵 PROGRAMADO',
    end: '🟢 FINALIZADO',
    stopped: '🔴 PARADO',
    ongoing: '🟡 EM ANDAMENTO',
  };

  const onSubmit = async (values: {
    title: string;
    description: string;
    message_id: string;
  }): Promise<void> => {
    const parsedContent = `**${values.title}**\n\n${values.description}${
      mention ? `\n\n<@&758706770675105802>` : ''
    }\n\n**STATUS:** ${availableStatus[status as keyof typeof availableStatus]}`;

    const res = await axios.post(`/api/webhook`, { content: parsedContent, messageId });

    toast({
      title:
        res?.data?.code < 400
          ? 'Webhook Executado com Sucesso'
          : `Erro ao executar (${res.data.code})`,
      status: res?.data?.code < 400 ? 'success' : 'error',
      duration: 5000,
    });
  };

  return (
    <DashboardLayout session={session}>
      <Stack w="85%" p="3%" flexDir="column" overflow="auto" minH="100vh">
        <Box>
          <Heading color="#9c5ddb" textAlign="center">
            <Icon as={FiBell} color="yellow" /> Status Webhook
          </Heading>
        </Box>

        <Flex>
          <Flex w="50%" textAlign="center" pt="30px">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.title}>
                <FormLabel htmlFor="title">Título</FormLabel>
                <Input
                  id="title"
                  placeholder="Atuaização Programada"
                  minW="410px"
                  {...register('title', {
                    required: 'Isso é obrigatório',
                    onChange: e => setTitle(e.target.value),
                  })}
                />
                <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description}>
                <FormLabel htmlFor="title">Descrição</FormLabel>
                <Input
                  id="description"
                  placeholder="A Menhera vai reiniciar às 16:00 para arrumar um bug no BlackJack"
                  minW="410px"
                  {...register('description', {
                    required: 'Isso é obrigatório',
                    onChange: e => setDesc(e.target.value),
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              <Flex flexDir="row">
                <FormControl isInvalid={errors.select}>
                  <FormLabel htmlFor="select">Tipo</FormLabel>
                  <Select
                    id="select"
                    placeholder="Status"
                    {...register('select', {
                      required: 'Isso é obrigatório',
                      onChange: e => setStatus(e.target.value),
                    })}
                  >
                    <option value="programmed">🔵 Programado</option>
                    <option value="end">🟢 Finalizado</option>
                    <option value="ongoing">🟡 Em Andamento</option>
                    <option value="stopped">🔴 Parado</option>
                  </Select>
                  <FormErrorMessage>{errors.select && errors.select.message}</FormErrorMessage>
                </FormControl>
                <FormControl alignSelf="center" pt={8}>
                  <Button
                    colorScheme={mention ? 'green' : 'pink'}
                    leftIcon={!mention ? <FiXCircle /> : <FiCheck />}
                    onClick={setMention.toggle}
                  >
                    Mencionar?
                  </Button>
                </FormControl>
              </Flex>
              <FormControl isInvalid={errors.message_id}>
                <FormLabel htmlFor="message_id">ID da Mensagem</FormLabel>
                <Input
                  id="message_id"
                  placeholder="907481979283439616"
                  minW="410px"
                  {...register('message_id', {
                    maxLength: { value: 18, message: 'ID Incorreto' },
                    minLength: { value: 18, message: 'ID Incorreto' },
                    onChange: e => setMessageId(e.target.value),
                  })}
                />
                <FormErrorMessage>
                  {errors.message_id && errors.message_id.message}
                </FormErrorMessage>
                <FormHelperText textAlign="left">
                  O ID da mensagem - Somente para Editar
                </FormHelperText>
              </FormControl>

              <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                Enviar
              </Button>
            </form>
          </Flex>
          <Flex alignSelf="flex-start" w="50%" pt="30px" flexDir="column">
            <Text mb="10px" fontWeight="bold" textAlign="center" fontSize="2xl">
              Preview
            </Text>
            <DiscordMessages>
              <DiscordMessage
                author="Menhera Status"
                bot={true}
                edited={messageId.length > 0}
                avatar="https://i.imgur.com/3Tv50Pc.jpg"
              >
                <b>{title}</b>
                {title.length > 0 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
                {desc.length > 0 && (
                  <>
                    {desc}
                    <br />
                    <br />
                  </>
                )}

                {mention && (
                  <>
                    <DiscordMention type="role" color="#b5c5fa" highlight={mention}>
                      StatusNotify (..notify status)
                    </DiscordMention>
                    <br />
                    <br />
                  </>
                )}

                {status.length > 0 && (
                  <>
                    <b>STATUS:</b> {availableStatus[status as keyof typeof availableStatus]}
                  </>
                )}
              </DiscordMessage>
            </DiscordMessages>
          </Flex>
        </Flex>
      </Stack>
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
