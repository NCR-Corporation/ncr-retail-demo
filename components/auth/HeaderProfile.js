import { useState, useEffect } from 'react';
import { useSession, getSession, signOut } from 'next-auth/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Spinner,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Nav,
} from 'reactstrap';
function HeaderProfile({ toggleModalLogin }) {
  const [session, loading] = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log(session, loading);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  return (
    <div className="d-inline-block">
      {!loading && (!session || !session.user) ? (
        <Button color="primary" onClick={toggleModalLogin}>
          Login
        </Button>
      ) : loading ? (
        <Button color="primary">
          <Spinner color="light" size="sm" />
        </Button>
      ) : (
        // <p>{session.user.givenName}</p>
        <Nav pills>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret className="text-white">
              <FontAwesomeIcon icon={faUser} /> {session.user.givenName}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={signOut}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      )}
    </div>
  );
}

export default HeaderProfile;
