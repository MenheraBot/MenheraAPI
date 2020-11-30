import React, { useState, useEffect } from 'react'
import ActivityTable from '../../components/activities/table'
import { Container, Button, Buttons, Manager, Form, Input, Select as SelectStyled } from './styles'
import { getActivities, addActivity, resetActivities, clearActivities } from '../../apis/api'
import { MdAdd, MdRefresh } from 'react-icons/md'
import { HiOutlineTrash } from 'react-icons/hi'
import './body.css'


function ActivitySelect ({ handle }) {
  const options = ['PLAYING', 'WATCHING', 'STREAMING', 'LISTENING']
  const emojis = ['🎮', '📺', '📹', '🎧']
  return (
    <SelectStyled onChange={handle}>
      {options.map((o, i) => (
        <option key={o} value={o}>{emojis[i]}</option>
      ))}
    </SelectStyled>
  )
}

export default () => {
  const [activities, setActivities] = useState([])
  const [activityType, setActivityType] = useState('PLAYING')
  const [activityName, setActivityName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await getActivities()
      setActivities(response?.data.sort() ?? [])
    }

    fetchData()
  }, [])

  function onChangeSelect (event) {
    console.log(event.target.value)
    setActivityType(event.target.value)
  }

  function onChangeInput (event) {
    setActivityName(event.target.value)
  }

  async function addNewActivity (event) {
    event.preventDefault()
    if (!activityName) {
      return
    }
    await addActivity(activityName, activityType)
    setActivities(activities.concat({ name: activityName, type: activityType }))
    setActivityName('')
  }

  async function onClickCleanButton() {
    await clearActivities()
    setActivities([])
  }

  async function onClickResetButton() {
    const reset = await resetActivities()
    setActivities(reset)
  }

  return (
    <Container>
      <Manager/>
        <Form>
          <Input value={activityName} onChange={onChangeInput} />
          <ActivitySelect handle={onChangeSelect} />
          <Button onClick={addNewActivity}><MdAdd />Adicionar</Button>
        </Form>
        <Buttons>
          <Button onClick={onClickResetButton}><MdRefresh />Resetar</Button>
          <Button  onClick={onClickCleanButton}><HiOutlineTrash />Apagar tudo</Button>
        </Buttons>
      <Manager/>
      <ActivityTable activities={activities} />
    </Container>
  )
}
