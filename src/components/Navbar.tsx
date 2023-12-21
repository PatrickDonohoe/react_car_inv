import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {

	const [isVisible, setIsVisible] = useState(false);
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	const signOutOnClick = () => {
		logout();
	};

	const signInOnClick = () => {
		loginWithRedirect();
	};

	const dropDown = () => {
		setIsVisible(!isVisible)
	};

	const clicked = () => {
		setIsVisible(false)
	};

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-400 p-6">
			<div className="flex item-center flex-shrink-0 text-black mr-6">
				<Link to='/' className='font-semibold text-xl tracking-tight'>Car Inventory</Link>
			</div>
			<div className="block">
				<button onClick={dropDown} className="flex items-center px-3 py-2 text-black hover:text-white hover:border-white">
					<i className="fas fa-bars"></i>
				</button>
			</div>
			{ isVisible ? (
				<div className="w-full block flex-grow items-center">
					<div className="text-sm lg:flex-grow">
						<button className="p-3 m-5 bg-blue-300 justify-center border-red-500 border-2">
							<div>
								<Link to='/' onClick={ clicked } className='flex place-items-center mt-4 lg:inline-block 
									lg:mt-0 text-black hover:text-white mr-4'>Home
								</Link>
							</div>
						</button>
						<button className="p-3 m-5 bg-blue-300 justify-center border-red-500 border-2">
							<div>
								<Link to='/about' onClick={ clicked } className='flex place-items-center mt-4 lg:inline-block 
									lg:mt-0 text-black hover:text-white mr-4'>About
								</Link>
							</div>
						</button>
						<button className="p-3 m-5 bg-blue-300 justify-center border-red-500 border-2">
							<div>
								<Link to='/dashboard' onClick={ clicked } className='flex place-items-center mt-4 lg:inline-block 
									lg:mt-0 text-black hover:text-white mr-4'>Dashboard
								</Link>
							</div>
						</button>
						{
							!isAuthenticated ?
							<button className="p-3 m-5 bg-blue-300 justify-center border-red-500 border-2">
								<div>
									<Link to='/' onClick={signInOnClick} className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-black hover:text-white'>
										Login
									</Link>
								</div>
							</button>
							:
							<button className="p-3 m-5 bg-blue-300 justify-center border-red-500 border-2">
								<div>
									<Link to='/' onClick={signOutOnClick} className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-black hover:text-white'>
										Logout
									</Link>
								</div>
							</button>
						}
					</div>
				</div>
			) : (
				<></>
			) }
		</nav>
  )
}

export default Navbar;
