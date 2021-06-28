import Link from 'next/link';
import { ListGroup } from 'reactstrap';

export default function Sidebar({ url }) {
  return (
    <ListGroup>
      <Link href="/user/profile">
        <a className={`list-group-item ${url === 'profile' && 'active'}`}>Profile</a>
      </Link>
      <Link href="/user/orders">
        <a className={`list-group-item ${url === 'orders' && 'active'}`}>Orders</a>
      </Link>
      {/* <Link href="/user/payments">
        <a
          className={`list-group-item ${
            url === 'payments' && 'active'
          } disabled`}
        >
          Payment Methods
        </a>
      </Link>
      <Link href="/user/password">
        <a
          className={`list-group-item ${
            url === 'password' && 'active'
          } disabled`}
        >
          Change Password
        </a>
      </Link> */}
    </ListGroup>
  );
}
