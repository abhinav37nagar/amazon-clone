import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exists.</p>
    </>
  );
};

export default ErrorPage;
