import React, { useState } from "react";
import Social from "./Social";
import MenuList from "./MenuList";
import "../styles/menuWrapper.scss";

const Menu = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const handleMenu = () => setOpenMenu(!openMenu);
  return (
    <div className={openMenu ? "menu_wrapper open" : "menu_wrapper"}>
      <div className="head_menu">
        <i className="i-menu" onClick={handleMenu}>
          <a className="">
            <i>
              <span>Menu</span>
            </i>
          </a>
        </i>
        <Social />
      </div>
      <MenuList open={openMenu} />
    </div>
  );
};
export default Menu;
