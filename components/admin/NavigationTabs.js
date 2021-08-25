import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faExternalLinkAlt, faList, faStore, faLayerGroup, faObjectGroup, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Nav, NavItem, NavLink } from 'reactstrap';

const NavigationTabs = ({ activeTab, tabs = true }) => {
  return (
    <>
      <Nav navbar={!tabs ? true : false} className="flex-column">
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
      </Nav>
      <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">Resources</h6>
      <Nav>
        <NavItem>
          <NavLink href="https://developer.ncr.com/" target="_blank">
            <FontAwesomeIcon icon={faExternalLinkAlt} className="feather" size="sm" />
            NCR Documentation & API Specs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/NCR-Corporation/ncr-retail-demo" target="_blank">
            <FontAwesomeIcon icon={faExternalLinkAlt} className="feather" size="sm" />
            Github Respository
          </NavLink>
        </NavItem>
      </Nav>
    </>
  );
};

export default NavigationTabs;
