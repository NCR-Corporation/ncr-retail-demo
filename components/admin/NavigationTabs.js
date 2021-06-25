import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faList, faStore, faLayerGroup, faObjectGroup, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Nav, NavItem } from 'reactstrap';
const NavigationTabs = ({ activeTab, tabs = true }) => {
  return (
    <Nav navbar={!tabs ? true : ''} className="flex-column">
      <NavItem>
        <Link href="/admin/dashboard">
          <a className={`nav-link ${activeTab === 'dashboard' && 'active'} ${!tabs && 'pl-0'}`}>
            <FontAwesomeIcon icon={faTachometerAlt} size="sm" className="feather" />
            Dashboard
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/orders">
          <a className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faList} className="feather" size="sm" />
            Orders
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/sites">
          <a className={`nav-link ${activeTab === 'sites' && 'active'}`}>
            <FontAwesomeIcon icon={faStore} className="feather" size="sm" />
            Sites
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/categories">
          <a className={`nav-link ${activeTab === 'categories' && 'active'}`}>
            <FontAwesomeIcon icon={faLayerGroup} className="feather" size="sm" />
            Categories
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/groups">
          <a className={`nav-link ${activeTab === 'groups' && 'active'}`}>
            <FontAwesomeIcon icon={faObjectGroup} className="feather" size="sm" />
            Groups
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/catalog">
          <a className={`nav-link ${activeTab === 'catalog' && 'active'}`}>
            <FontAwesomeIcon icon={faShoppingCart} className="feather" size="sm" />
            Global Catalog
          </a>
        </Link>
      </NavItem>
      {/* <NavItem>
        <Link href="/admin/settings">
          <a className={`nav-link ${activeTab === 'settings' && 'active'}`}>
            Settings
          </a>
        </Link>
      </NavItem> */}
    </Nav>
  );
};

export default NavigationTabs;
