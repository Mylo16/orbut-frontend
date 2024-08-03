import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import images from '../../utils/images';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const dispatch = useDispatch();

  const handleLinkClicked = (index) => {
    setActiveLink(index);
  };

  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest('.nav') && !event.target.closest('.links')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="nav">
      <div className="logo">Orbút</div>
      <div className="triagram" onClick={() => setIsOpen(!isOpen)}>
        &#9776;
      </div>
      <div className={`links ${isOpen ? 'open' : ''}`}>
        <span className="close-btn" onClick={() => setIsOpen(false)}>&times;</span>
        <ul className="side-links">
        <li className={`side-link ${activeLink === 1 ? 'active':''}`} onClick={() => handleLinkClicked(1)}>
          <img src={images.dashboard} alt="dashboard-icon" className="icon" />
          <Link className="link" to="/home">Dashboard</Link>

        </li>
        <li className={`side-link ${activeLink === 2 ? 'active':''}`} onClick={() => handleLinkClicked(2)}>
          <img src={images.campaign} alt="campaign-icon" className="icon" />
          <Link className="link" to="/home/campaigns">Campaigns</Link>
        </li>
        <li className={`side-link ${activeLink === 3 ? 'active':''}`} onClick={() => handleLinkClicked(3)}>
          <img src={images.chat} alt="chat-icon" className="icon" />
          <Link className="link" to="/home/chat">Chat</Link>
        </li>
        <li className={`side-link ${activeLink === 4 ? 'active':''}`} onClick={() => handleLinkClicked(4)}>
          <img src={images.leads} alt="leads=icon" className="icon" />
          <Link className="link" to="/home/leads">Leads</Link>
        </li>
        <li className={`side-link ${activeLink === 5 ? 'active':''}`} onClick={() => handleLinkClicked(5)}>
          <img src={images.support} alt="support-icon" className="icon" />
          <Link className="link" to="/home/support">Support Center</Link>

        </li>
        <li className={`side-link ${activeLink === 6 ? 'active':''}`} onClick={() => handleLinkClicked(6)}>
          <img src={images.archive} alt="archives-icon" className="icon" />
          <Link className="link" to="/home/archives">Archives</Link>
        </li>
      </ul>
      </div>
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
    </nav>
    <div className="outlet"><Outlet /></div>
    </>

  );
}

export default Navbar;
