import React, { useState } from 'react';
import Header from '~/components/admin/Header';
import Groups from '~/components/admin/groups/Groups';

import { Container, Spinner } from 'reactstrap';
import useDashboard from '~/lib/hooks/useDashboard';

const GroupsTab = () => {
  let { data, isLoading, isError } = useDashboard('groups');

  return (
    <div>
      <Header navigation={true} activeTab="groups" />
      <Container fluid className="w-75 my-2 flex-grow-1">
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="dark" />
          </div>
        )}
        {isError && (
          <small className="text-muted">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && <Groups data={data.result ?? []} />}
      </Container>
    </div>
  );
};

export default GroupsTab;
