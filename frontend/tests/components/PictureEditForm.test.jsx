import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PictureEditForm from '../../src/components/forms/PictureEditForm';
import { expect, it } from 'vitest';

describe('PictureEditForm', () => {
  const mockOnUpdate = vi.fn();
  const mockToggleEditing = vi.fn();

  const renderComponent = () => {
    return {
      ...render(
        <PictureEditForm
          title="Hello World"
          onUpdate={mockOnUpdate}
          toggleEditing={mockToggleEditing}
        />,
      ),
      textarea: screen.getByRole('textbox'),
      user: userEvent.setup(),
      toggleButton: screen.getByRole('button', { name: /reset/i }),
      updateButton: screen.getByRole('button', { name: /update/i }),
      updateHandler: mockOnUpdate,
      toggleHandler: mockToggleEditing,
    };
  };

  it('renders', () => {
    const { textarea, toggleButton } = renderComponent();

    expect(screen.getByTestId('picture-edit-form')).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(toggleButton).toBeInTheDocument();
    expect(textarea).toHaveValue('Hello World');
  });

  it('toggles editing when toggle button clicked', async () => {
    const { toggleButton, toggleHandler, textarea, user } = renderComponent();

    await user.clear(textarea);
    await user.type(textarea, 'gunter glieben glauten globen');
    await user.click(toggleButton);

    expect(toggleHandler).toHaveBeenCalledOnce();
    expect(textarea).not.toHaveValue('gunter glieben glauten globen');
  });

  it('editss picture when edit button clicked', async () => {
    const { textarea, updateButton, updateHandler, user } = renderComponent();

    await user.clear(textarea);
    await user.type(textarea, 'gunter glieben glauten globen');
    await user.click(updateButton);

    expect(updateHandler).toHaveBeenCalledOnce();
    expect(updateHandler).toHaveBeenCalledWith({
      title: 'gunter glieben glauten globen',
    }, expect.anything());
  });
});
