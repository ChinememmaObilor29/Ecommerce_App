import './Navbar.css';
import Nav_logo from '../../assets/nav-logo.svg';
import Nav_Profile from '../../assets/nav-profile.svg';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={Nav_logo} alt="" className="nav-logo" />
      <img src={Nav_Profile} alt="" className='nav_profile' />
    </div>
  )
}

export default Navbar;
