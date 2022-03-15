import React from 'react';
import styled from 'styled-components';
import Column from './Column';
import { ColumnType } from '../types';

export interface DashboardProps {
  columns: ColumnType[];
}

export default function Dashboard(props: DashboardProps) {
  const { columns } = props;

  return (
    <div>
      <h1>Treplo prototype</h1>
      <Container>
        {columns
          .map((column) => (
            <Column
              key={column.id}
              id={column.id}
              cards={column.cards}
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
