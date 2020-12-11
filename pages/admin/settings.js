import { Button } from 'reactstrap';
import Header from '~/components/admin/Header';
import NavigationTabs from '~/components/admin/NavigationTabs';

const SettingsTab = () => {
  const createSellingConfiguration = (param) => {
    fetch(`/api/selling/configuration`, {
      method: 'POST',
      body: JSON.stringify({ param }),
    });
  };

  return (
    <div>
      <Header />
      <main className="container my-4 flex-grow-1">
        <NavigationTabs activeTab="settings" />
        <div className="bg my-4">
          <h5>Settings</h5>
          <Button color="primary">Create Tax Authority</Button>{' '}
          <Button color="primary">Create Tax Rate</Button>{' '}
          <Button color="primary">Create Tender</Button>
        </div>
      </main>
    </div>
  );
};

export default SettingsTab;
