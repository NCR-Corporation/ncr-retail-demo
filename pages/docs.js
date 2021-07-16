import { createSwaggerSpec } from 'next-swagger-doc';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const ApiDoc = ({ spec }) => {
  return <SwaggerUI spec={spec} />;
};

export const getStaticProps = async (ctx) => {
  const spec = createSwaggerSpec({
    title: 'NCR Retail Demo Swagger',
    version: '0.1.0'
  });
  return {
    props: {
      spec
    }
  };
};

export default ApiDoc;
