import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import closeBtn from '../../assets/close.png';
import { userSignout } from '../../redux/userSlice';
import images from '../../utils/images';

export default function SideBar({
  menuClicked, phone, onChildClick, showMenu,
}) {
  const { user } = useSelector((store) => store.user);
  const name = phone ? 'sidebar' : 'desktop-sidebar';
  const dispatch = useDispatch();
  document.addEventListener('scroll', () => {
    onChildClick();
  });
  const handleSignout = () => {
    dispatch(userSignout());
  };

  return (
    <div className={menuClicked ? `${name}` : 'no-sidebar'}>
      <div className="menu-head">
        <div
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Space') {
              showMenu();
            }
          }}
          role="button"
          tabIndex={0}
          onClick={() => showMenu()}
        >
          <img src={closeBtn} alt="close-btn" className="close-btn" />
        </div>
      </div>
      <ul className="side-links">
        <li className="side-link">
          <img src={images.dashboard} alt="dashboard-icon" className="icon" />
          <Link className="link" to="/home">Dashboard</Link>
        </li>
        <li className="side-link">
          <img src={images.campaign} alt="campaign-icon" className="icon" />
          <Link className="link" to="/home/campaigns">Campaigns</Link>
        </li>
        <li className="side-link">
          <img src={images.chat} alt="chat-icon" className="icon" />
          <Link className="link" to="/home/chat">Chat</Link>
        </li>
        <li className="side-link">
          <img src={images.leads} alt="leads=icon" className="icon" />
          <Link className="link" to="/home/leads">Leads</Link>
        </li>
        <li className="side-link">
          <img src={images.support} alt="support-icon" className="icon" />
          <Link className="link" to="/home/support">Support Center</Link>
        </li>
        <li className="side-link">
          <img src={images.archive} alt="archives-icon" className="icon" />
          <Link className="link" to="/home/archives">Archives</Link>
        </li>
        <div
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Space') {
              handleSignout();
            }
          }}
          role="button"
          tabIndex={0}
          className="side-link"
          onClick={handleSignout}
        >
          <img src={images.signout} alt="logout" className="logo" />
          <Link className="link" to="/">Sign Out</Link>
        </div>
      </ul>
    </div>
  );
}

SideBar.propTypes = {
  phone: PropTypes.bool.isRequired,
  menuClicked: PropTypes.bool.isRequired,
  onChildClick: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
};
