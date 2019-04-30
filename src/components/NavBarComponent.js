

const NavBarComponent = () => (
    <div>
        <Navbar>
            <NavbarBrand><img src={logo} className="nav-logo" /></NavbarBrand>
            <Nav navbar>

                <button className="primary-button"><Link to="/login">Login</Link></button>
                <EnsureLoggedIn>
                    <NavItem className="SingleLink"><Link to="/">Home</Link></NavItem>
                    <NavItem className="SingleLink"><Link to="campaignview">Campaign View</Link></NavItem>
                    <NavItem className="SingleLink"><Link to="/logout">LogOut</Link></NavItem>
                </EnsureLoggedIn>
            </Nav>
        </Navbar>
    </div>

)
export default NavBarComponent;

