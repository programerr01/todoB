import React from 'react';
import styled from 'styled-components';

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: ${props => props.completed ? '#f5f5f5' : '#fff'};
`;

const TodoTitle = styled.h3`
  margin: 0;
  flex: 1;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

const TodoDescription = styled.p`
  margin: 0;
  flex: 1;
  color: ${props => props.completed ? '#999' : '#333'};
`;

const CheckboxContainer = styled.div`
  margin-right: 10px;
`;

// Todo Component
const Todo = ({id, title, description, completed, onToggleCompleted }) => {
  return (
    <TodoContainer completed={completed}>
      <CheckboxContainer>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => {onToggleCompleted(id)}}
        />
      </CheckboxContainer>
      <TodoTitle completed={completed}>{title}</TodoTitle>
      <TodoDescription completed={completed}>{description}</TodoDescription>
    </TodoContainer>
  );
};

export default Todo;