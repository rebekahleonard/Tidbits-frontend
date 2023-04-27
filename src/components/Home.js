import React, { useContext, useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown, Stack } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { MdOutlineLogin } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import logohome from "../logohome.png";
import { Container } from 'react-bootstrap';
import RecipeContext from '../contexts/RecipeContext';
// import Picture1 from "../Picture1.png";
import '../css/Nav.css'


const Home = () => {

    let navigate = useNavigate();
        const id = localStorage.getItem('userId');
        const user = localStorage.getItem('user');
    
    let { searchRecipe } = useContext(RecipeContext);
    const [ searchQuery, setSearchQuery ] = useState('');


    function onSignOut() {
        localStorage.clear();
        navigate('/signin')
    }

    function handleSearch(e) {
        // TODO set value to the setSearchQuery()
        if ( e.target.value === "") return;
        // const searchRecipe = ;
        setSearchQuery(e.target.value);
        // const newFilter = filter((value) => {
        //     return value.title.toLowerCase().includes(searchRecipe.toLowerCase());
        // });
        // // if ( e.target.value === "") return;
        // if (searchRecipe === "") {
        //     setRecipes([]);
        // } else {
        //     setRecipes(newFilter);
        // }
        
    };

    function submitSearch(e) {
       // TODO create state searchQuery
       navigate("/search/" + searchQuery)
    }
    
//     let context = useContext(RecipeContext);
// useEffect(() => {
//     console.log(context.recipes)
// },[]);


    function authLink() {
        if (user === null)
            return (
                <Nav>
                <Link to="/signin" className='nav-link'>Login<MdOutlineLogin></MdOutlineLogin></Link>
                <Link to="/signup" className='nav-link'>Sign Up</Link>
                </Nav>
               
                )
        else {
            return  <Nav className='user'>
                <Link className='nav-link' to="/profile">{`Welcome back `+ user} <CgProfile></CgProfile></Link>
                <Link to={`/profile`} className='nav-link'>My Profile</Link>
                <Link className='nav-link' variant="link" to="/signin" onClick={onSignOut}>Sign Out</Link>
            </Nav>
        }
    }


    return (
        <div className='headerbar'>
            <Navbar className='navbar' >
            <Container>
            <Navbar.Brand href="/">
            <img
              className="navbarBrand"
              src={logohome}
              height={65}
              alt="logo"
            />
          </Navbar.Brand>
                <Nav >
                    {authLink()}<Link to="/" className='nav-link'>Home</Link>
                    <NavDropdown title="Select Continent" id="basic-nav-dropdown">
                        <Link to="/africa" className='nav-link'>Africa</Link>
                        <Link to="/antarctica" className='nav-link'>Antarctica</Link>
                        <Link to="/asia" className='nav-link'>Asia</Link>
                        <Link to="/australia" className='nav-link'>Australia</Link>
                        <Link to="/europe" className='nav-link'>Europe</Link>
                        <Link to="/northamerica" className='nav-link'>North America</Link>
                        <Link to="/southamerica" className='nav-link'>South America</Link>
                    </NavDropdown>
                </Nav>
                <input onChange={handleSearch}/>
                <button onClick={submitSearch}>search</button>
                {/* <input onChange={handleSearch}/> */}
                </Container>
            </Navbar>
            <Stack>
                <Outlet />
            </Stack>
        </div>

    )
};

export default Home;