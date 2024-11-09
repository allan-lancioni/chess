import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Board from './Board';
import { RefObject } from 'react';
import '@testing-library/jest-dom'

describe('Board', () => {

  let boardContainerRef: RefObject<HTMLDivElement>;
  
  beforeEach(() => {
    const mockDiv = document.createElement('div');
    mockDiv.style.width = '800px';
    mockDiv.style.height = '800px';
    const mockDivRect = {
      ...mockDiv.getBoundingClientRect(),
      width: 800,
      height: 800,
    };
    mockDiv.getBoundingClientRect = () => mockDivRect;
    boardContainerRef = { current: mockDiv } as RefObject<HTMLDivElement>;
  });

  it('should render the board', () => {
    render(<Board boardContainerRef={boardContainerRef} />);
    const boardElement = screen.getByTestId('board');
    expect(boardElement).toBeInTheDocument();
  });

  it('should have 64 squares - a1 to h8', () => {
    render(<Board boardContainerRef={boardContainerRef}  />);
    const squares = screen.getAllByTestId('square');
    expect(squares.length).toBe(64);
    expect(squares[0]).toHaveAttribute('data-square', 'a8');
    expect(squares[squares.length - 1]).toHaveAttribute('data-square', 'h1');
  });

});