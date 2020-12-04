import { ListGroup, ListGroupItem } from 'reactstrap';

export default function Sidebar({ url }) {
  return (
    <ListGroup>
      <ListGroupItem
        // active={url === 'profile' && 'active'}
        tag="a"
        href="#"
        action
      >
        Profile
      </ListGroupItem>
      <ListGroupItem
        // acitive={url === 'orders' && 'active'}
        tag="a"
        href="#"
        action
      >
        Order History
      </ListGroupItem>
      <ListGroupItem
        // active={url === 'payments' && 'active'}
        tag="a"
        href="#"
        action
      >
        Payment Methods
      </ListGroupItem>
      <ListGroupItem
        // active={url === 'addresses' && 'active'}
        tag="a"
        href="#"
        action
      >
        Addresses
      </ListGroupItem>
    </ListGroup>
  );
}
