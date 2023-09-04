import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ValidationError from '../src/components/validationError';

describe('ValidationError component', () => {
  it('renders without crashing', () => {
    render(<ValidationError name="testName" />);
  });

  it('shows error message when touched is true and error is present', () => {
    const { getByText } = render(
      <ValidationError name="testName" touched error="Test error" />,
    );
    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('does not show error message when touched is false, even if error is present', () => {
    const { queryByText } = render(
      <ValidationError name="testName" touched={false} error="Test error" />,
    );
    expect(queryByText('Test error')).toBeNull();
  });

  it('does not show error message when error is an empty string, even if touched is true', () => {
    const { queryByText } = render(
      <ValidationError name="testName" touched error="" />,
    );
    expect(queryByText('Test error')).toBeNull();
  });
});
