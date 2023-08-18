// @vitest-environment happy-dom
import { render, screen } from './test/utilities';
import Counter from '.';

const renderCounter = (initialCount = 0) => {
  const { user } = render(<Counter initialCount={initialCount} />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: /increment/i });
  const resetButton = screen.getByRole('button', { name: /reset/i });

  return { user, currentCount, resetButton, incrementButton };
};

test('it should render the component', () => {
  const { currentCount } = renderCounter();

  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user, currentCount, incrementButton } = renderCounter();

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  const { currentCount } = renderCounter(10);

  expect(currentCount).toHaveTextContent('10');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const { currentCount, user, resetButton } = renderCounter(10);

  expect(currentCount).toHaveTextContent('10');

  await user.click(resetButton);

  expect(currentCount).toHaveTextContent('0');
});
