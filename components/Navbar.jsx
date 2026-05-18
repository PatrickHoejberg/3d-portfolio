import React from "react";

const Navbar = () => {
  return (
    <header>
      <div className="content-fit">
        <div className="logo">Patrick S. Hoejberg</div>
        <nav>
          <ul>
            <li>Contacts</li>
            <li>Experience</li>
            <li>Projects</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;