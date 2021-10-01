import { useState } from 'react';
import { useSession, signOut } from 'next-auth/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Button, Spinner, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

function ProfileDropdown() {
  const router = useRouter();
  const [session, loading] = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  return (
    <div className="d-inline-block">
      {!loading && (!session || !session.user) ? (
        <Link href="/auth/login">
          <Button color="link" className="text-light py-0 px-2 text-left d-flex flex-column justify-content-start text-decoration-none">
            <span>
              <small>Signup / Login</small>
            </span>
            <span>
              My Account
              <FontAwesomeIcon icon={faChevronDown} size="1x" className="pl-1" />
            </span>
          </Button>
        </Link>
      ) : loading ? (
        <Button color="link" className="text-light p-0 text-left d-flex flex-column justify-content-start text-decoration-none">
          <span>
            <Spinner color="light" size="sm" />
          </span>
        </Button>
      ) : (
        <div className="nav">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="a" caret className="text-white text-decoration-none pointer">
              <FontAwesomeIcon icon={faUser} /> {session.user.givenName}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() =>
                  router.push({
                    pathname: '/user/profile'
                  })
                }
              >
                Profile
              </DropdownItem>
              <DropdownItem
                onClick={() =>
                  router.push({
                    pathname: '/user/orders'
                  })
                }
              >
                Orders
              </DropdownItem>
              <DropdownItem onClick={() => signOut({ callbackUrl: '/' })}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
