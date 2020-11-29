import styled from 'styled-components'

export const Td = styled.td``
export const Th = styled.th``

export const Tr = styled.tr`
  border-bottom: 1px solid #dddddd;
`

export const THead = styled.thead`
  background-color: #212529;
  color: #DEE7E7;
`

export const TBody = styled.tbody`
  background-color: #DEE7E7;
  ${Tr}:nth-of-type(even) {
    background-color: #F4FAFF;
  }

  ${Tr}:last-of-type {
    border-bottom: 2px solid #212529;
  }
`

export const Table = styled.table`
  border-collapse: collapse;
  box-shadow: 3px 3px 5px 6px #333;
  ${Td}, ${Th} {
    padding: 12px 15px;
  }
`
