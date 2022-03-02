import React from "react";
import "./header.styles.scss";

import { Link } from "react-router-dom"; // so the logo can act as a link

import { ReactComponent as Logo } from "../../assets/crown.svg";

import { auth } from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import CartIcon from "../cart-icon/cart-icon.components";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {
        //object evaluates to true and null to false
        currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )
      }
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);
//old code before using memoizing and reselect
//const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//nested destructuring
//currentUser,
//hidden,
//currentUser: state.user.currentUser, //user form de root reducer witch points to userReducer and we want de currentUser
//});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
}); // createStructuredSelector automatically pass the state to the selectors

export default connect(mapStateToProps)(Header);
