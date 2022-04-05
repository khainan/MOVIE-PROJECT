import { useState, useRef, useEffect } from 'react';

// icon
import hamburgerIcon from './assets/hamburger-icon.png';
import userIcon from './assets/user.png';

// styles
import './HeaderSidebar.scss';

const HeaderSidebar = (props) => {
  const { menus } = props || {};
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const handleOpenSidebar = () => {
    setOpen((sidebar) => !sidebar);
  };

  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleChangePage = (path) => {
    // Router.replace(path);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  return (
    <div className="dashboard-header-container">
      <div className="dashboard-header-sidebar" ref={ref}>
        <div className="dashboard-header">
          <div className="dashboard-header-logo">
            <div className="hamburger-icon">
              <img src={hamburgerIcon} alt="" onClick={handleOpenSidebar} />
            </div>
          </div>
          <div className="dashboard-header-user">
            <p>
              Hello, <span>'User Name'</span>
            </p>
            <img alt="" src={userIcon} width={24} height={24} />
          </div>
        </div>
        <div className={open ? 'dashboard-sidebar-open' : 'dashboard-sidebar'}>
          {(menus || []).map((menu, index) => (
            <div
              className="dashboard-sidebar-menu"
              key={index}
              onClick={() => handleChangePage(menu.path)}
            >
              <img alt="" src={menu.icon} width={24} height={24} />
              <p>{menu.title}</p>
            </div>
          ))}
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default HeaderSidebar;
