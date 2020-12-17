import Link from 'next/link';
import { Nav, NavItem } from 'reactstrap';
const NavigationTabs = ({ activeTab, tabs = true }) => {
  return (
    <Nav tabs={tabs ? true : ''} navbar={!tabs ? true : ''}>
      <NavItem>
        <Link href="/admin/dashboard">
          <a
            className={`nav-link ${activeTab === 'dashboard' && 'active'} ${
              !tabs && 'pl-0'
            }`}
          >
            Dashboard
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/orders">
          <a className={`nav-link ${activeTab === 'orders' && 'active'}`}>
            Orders
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/sites">
          <a className={`nav-link ${activeTab === 'sites' && 'active'}`}>
            Sites
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/categories">
          <a className={`nav-link ${activeTab === 'categories' && 'active'}`}>
            Categories
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/groups">
          <a className={`nav-link ${activeTab === 'groups' && 'active'}`}>
            Groups
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/catalog">
          <a className={`nav-link ${activeTab === 'catalog' && 'active'}`}>
            Global Catalog
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/settings">
          <a className={`nav-link ${activeTab === 'settings' && 'active'}`}>
            Settings
          </a>
        </Link>
      </NavItem>
    </Nav>
  );
};

export default NavigationTabs;
