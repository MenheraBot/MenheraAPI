import React from 'react';
import { Table, Th, TBody, THead, Td, Tr } from './styles';

export default function AcitivityTable({ activities }) {
  return (
    <Table>
      <THead>
        <Tr>
          <Th>Name</Th>
          <Th>Type</Th>
        </Tr>
      </THead>
      <TBody>
        {activities?.map(activity => (
          <Tr key={activity.name}>
            <Td>{activity.name}</Td>
            <Td>{activity.type}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
}
