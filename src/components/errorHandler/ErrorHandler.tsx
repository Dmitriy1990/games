import React from 'react';

type Props = {
  error: Error;
};

export const ErrorHandler: React.FC<Props> = ({ error }: Props) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
};
