import { Container, Button } from 'reactstrap';
import Header from '~/components/admin/Header';
import NavigationTabs from '~/components/admin/NavigationTabs';

const SettingsTab = () => {
  const createSellingConfiguration = (param) => {
    fetch(`/api/selling/configuration`, {
      method: 'POST',
      body: JSON.stringify({ param }),
    });
  };

  const resetDatabase = () => {
    fetch('/api/reset', {
      method: 'POST',
    });
  };

  return (
    <div>
      <Header navigation={true} activeTab="settings" />
      <Container fluid className="w-75 my-4 flex-grow-1">
        <div className="bg my-4">
          <h5>Settings</h5>
          <Button color="primary" onClick={resetDatabase}>
            Reset Database
          </Button>{' '}
          <Button color="primary">Create Tax Authority</Button>{' '}
          <Button color="primary">Create Tax Rate</Button>{' '}
          <Button color="primary">Create Tender</Button>
        </div>
      </Container>
    </div>
  );
};

export default SettingsTab;
