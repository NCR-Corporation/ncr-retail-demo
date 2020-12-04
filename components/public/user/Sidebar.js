import { ListGroup, ListGroupItem } from 'reactstrap';

export default function Sidebar({ url }) {
  return (
    <ListGroup>
      <ListGroupItem active={url === 'profile' && true} tag="a" href="#" action>
        Profile
      </ListGroupItem>
      <ListGroupItem active={url === 'orders' && true} tag="a" href="#" action>
        Order History
      </ListGroupItem>
      <ListGroupItem
        active={url === 'payments' && true}
        tag="a"
        href="#"
        action
      >
        Payment Methods
      </ListGroupItem>
      <ListGroupItem
        active={url === 'addresses' && true}
        tag="a"
        href="#"
        action
      >
        Addresses
      </ListGroupItem>
    </ListGroup>
  );
}
