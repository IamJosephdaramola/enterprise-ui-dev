import { Provider } from 'react-redux';
import { render, screen } from 'test/utilities';
import { PackingList } from './index';
import { createStore } from './store';

const renderComponent = () => {
  const { user } = render(
    <Provider store={createStore()}>
      <PackingList />
    </Provider>,
  );
  const title = screen.getByText('Packing List');
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', {
    name: 'Add New Item',
  });

  return { user, title, newItemInput, addNewItemButton };
};

it('renders the Packing List application', () => {
  renderComponent();
});

it('has the correct title', async () => {
  const { title } = renderComponent();
  expect(title).toBeVisible();
});

it('has an input field for a new item', () => {
  const { newItemInput } = renderComponent();
  expect(newItemInput).toBeVisible();
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  const { newItemInput, addNewItemButton } = renderComponent();

  expect(newItemInput).toHaveValue('');
  expect(addNewItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { newItemInput, addNewItemButton, user } = renderComponent();

  await user.type(newItemInput, 'MackBook Pro');

  expect(addNewItemButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { newItemInput, addNewItemButton, user } = renderComponent();
  await user.type(newItemInput, 'iPad Pro');
  await user.click(addNewItemButton);

  expect(screen.getByLabelText('iPad Pro')).not.toBeChecked();
});

it('removes an item"', async () => {
  const { newItemInput, addNewItemButton, user } = renderComponent();

  await user.type(newItemInput, 'iPad Pro');
  await user.click(addNewItemButton);

  const removeItem = screen.getByRole('button', { name: /remove/i });

  await user.click(removeItem);

  expect(removeItem).not.toBeInTheDocument();
});
