import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Buttons,
  Manager,
  Form,
  Input,
  Select,
  Table,
  TBody,
  THead,
  Tr,
} from './styles';
import { getActivities, addActivity, resetActivities, clearActivities } from '../../services/api';
import { MdAdd, MdRefresh } from 'react-icons/md';
import { HiOutlineTrash } from 'react-icons/hi';
import Button from '../../components/Button';
import Login from '../../components/Login';
import { Context as AuthContext } from '../../store/AuthContext';

const options = ['PLAYING', 'WATCHING', 'STREAMING', 'LISTENING'];
const emojis = ['🎮', '📺', '📹', '🎧'];

export default () => {
  const [activities, setActivities] = useState([]);
  const [activityType, setActivityType] = useState('PLAYING');
  const [activityName, setActivityName] = useState('');
  const [auth, setAuth] = useContext(AuthContext);

  const isAuthenticated = () => !!(auth?.username && auth?.password);

  function onHandleError(error) {
    if (error) setAuth(null);
    console.error('Whoops! Houve um erro.', error?.message ?? error);
  }

  useEffect(() => {
    const fetchData = () =>
      getActivities()
        .then(res => setActivities(res?.data.sort() ?? []))
        .catch(e => onHandleError(e));

    fetchData();
  }, []);

  function onChangeSelect(event) {
    setActivityType(event.target.value);
  }

  function onChangeInput(event) {
    setActivityName(event.target.value);
  }

  async function addNewActivity(event) {
    event.preventDefault();
    if (!activityName) {
      return;
    }
    return addActivity(activityName, activityType)
      .then(() => {
        setActivities(activities.concat({ name: activityName, type: activityType }));
        setActivityName('');
      })
      .catch(e => onHandleError(e));
  }

  function onClickCleanButton() {
    return clearActivities()
      .then(() => setActivities([]))
      .catch(onHandleError);
  }

  function onClickResetButton() {
    return resetActivities()
      .then(reset => setActivities(reset))
      .catch(e => onHandleError(e));
  }

  return (
    <Container>
      {isAuthenticated() ? null : <Login onClick />}
      <Manager />
      <Form>
        <Input value={activityName} onChange={onChangeInput} required />
        <Select onChange={onChangeSelect}>
          {options.map((o, i) => (
            <option key={o} value={o}>
              {emojis[i]}
            </option>
          ))}
        </Select>
        <Button onClick={addNewActivity}>
          <MdAdd />
          Adicionar
        </Button>
      </Form>
      <Buttons>
        <Button onClick={onClickResetButton}>
          <MdRefresh />
          Resetar
        </Button>
        <Button onClick={onClickCleanButton}>
          <HiOutlineTrash />
          Apagar tudo
        </Button>
      </Buttons>
      <Manager />
      <Table>
        <THead>
          <Tr>
            <th>Name</th>
            <th>Type</th>
          </Tr>
        </THead>
        <TBody>
          {activities?.map(activity => (
            <Tr key={activity.name}>
              <td>{activity.name}</td>
              <td>{activity.type}</td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </Container>
  );
};
