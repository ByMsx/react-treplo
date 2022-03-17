import React from 'react';
import styled from 'styled-components';
import Column from './Column';
import { useAppSelector } from '../../state/hooks';
import { selectColumns } from '../../state/columns/selectors';

export default function Dashboard() {
  const { columns } = useAppSelector(selectColumns);

  return (
    <div>
      <h1>Treplo prototype</h1>
      <Container>
        {columns
          .map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
            />
          ))}
      </Container>
    </div>
  );
}

const Container = styled.div`
  padding: 0 2em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
