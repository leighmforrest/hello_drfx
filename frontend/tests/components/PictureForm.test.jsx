import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PictureForm from '../../src/components/forms/PictureForm';
import { testFile } from '../helpers';
import { MAX_FILE_SIZE } from '../../settings';
import { expect, it } from 'vitest';

describe('PictureForm', () => {
  const renderComponent = () => {
    const mockOnUpload = vi.fn();

    return {
      ...render(<PictureForm onUpload={mockOnUpload} />),
      user: userEvent.setup(),
      title: screen.getByLabelText(/title/i),
      picture: screen.getByLabelText(/picture/i),
      submit: screen.getByRole('button', { name: /upload/i }),
      handler: mockOnUpload,
    };
  };

  it('renders', () => {
    const { title, picture, submit } = renderComponent();

    expect(title).toBeInTheDocument();
    expect(picture).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  it('does not submit with no image', async () => {
    const { title, submit, user, handler } = renderComponent();

    await user.type(title, 'Hello World!');
    await user.click(submit);
    
    expect(screen.getByText(/A picture is required./)).toBeInTheDocument();
    expect(handler).not.toHaveBeenCalled();
  });

  it('submits with valid input', async () => {
    const imageFile = testFile();
    const { title, picture, submit, user, handler } = renderComponent();

    await user.type(title, 'Hello World!');
    await user.upload(picture, imageFile);
    await user.click(submit);

    expect(handler).toHaveBeenCalled();
    screen.debug();
  });

  it.each([
    ['tooBig.png', 'image/png'],
    ['tooBig.gif', 'image/gif'],
    ['tooBig.jpeg', 'image/jpeg'],
    ['tooBig.jpg', 'image/jpg'],
  ])(
    'does not submit with too big a file in %s format',
    async (name, format) => {
      const largeFile = testFile(
        name,
        format,
        'a'.repeat(MAX_FILE_SIZE + 1024),
      );
      const { title, picture, submit, user, handler } = renderComponent();

      await user.type(title, 'Hello World!');
      await user.upload(picture, largeFile);
      await user.click(submit);

      expect(
        screen.getByText(/this file is too large \(max 5MB\)\./i),
      ).toBeInTheDocument();
      expect(handler).not.toHaveBeenCalled();
    },
  );

  it.each([
    ['hello.txt', 'text/plain'],
    ['hello.gif', 'application/pdf'],
    ['hello.md', 'text/markdown'],
    ['hello.json', 'application/json'],
  ])(
    'does not submit %s with unsupported format => %s',
    async (name, format) => {
      const unsupportedFile = testFile(name, format, 'a'.repeat(MAX_FILE_SIZE));
      const { title, picture, submit, user, handler } = renderComponent();

      await user.type(title, 'Hello World!');
      await user.upload(picture, unsupportedFile);
      await user.click(submit);

      screen.debug();
      expect(
        screen.getByText(/file type is unsupported/i),
      ).toBeInTheDocument();
      expect(handler).not.toHaveBeenCalled();
    },
  );

  it.each([
    [null, /title is required/i],
    ['abc', /title must be at least 6 characters./i],
    ['a'.repeat(127), /title must not exceed 126 characters./i],
  ])('does not submit %s => %s', async (invalidTitle, message) => {
    const uploadFile = testFile();
    const { title, picture, submit, user, handler } = renderComponent();

    if (invalidTitle) await user.type(title, invalidTitle);
    await user.upload(picture, uploadFile);
    await user.click(submit);

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(handler).not.toHaveBeenCalled();
  });
});
