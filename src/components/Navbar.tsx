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
		// navbar and title 
		<nav className="fixed top-0 w-full flex items-center justify-around bg-[#0F4C5C] px-6">
			<div className="flex items-center shrink-0 text-[#E36414]">
				<Link to='/' className='font-semibold text-xl'>Car Inventory</Link>
			</div>

			{/* menu for M: screens */}
			{/* if >= M: or dropDown == isVisible, use code below, else show hamburger */}
			<div className="hidden md:flex w-full flex-grow items-center justify-around">
				{/* <div className="text-sm items-center lg:flex-grow"> */}
					<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
						<div>
							<Link to='/' onClick={clicked} className='flex place-items-center lg:inline-block 
									lg:mt-0 text-[#E36414] hover:text-white'>Home
							</Link>
						</div>
					</button>

					{
						!isAuthenticated ?
							<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
								<div>
									<Link to='/' onClick={signInOnClick}
										className='flex place-items-center lg:inline-block lg:mt-0 
											text-[#E36414] hover:text-white'
									>
										Login
									</Link>
								</div>
							</button>
							:
							<>
								<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
									<div>
										<Link to='/dashboard' onClick={clicked} className='flex place-items-center lg:inline-block 
											lg:mt-0 text-[#E36414] hover:text-white'>Dashboard
										</Link>
									</div>
								</button>
								<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
									<div>
										<Link to='/' onClick={signOutOnClick} className='flex place-items-center lg:inline-block lg:mt-0 text-[#E36414] hover:text-white'>
											Logout
										</Link>
									</div>
								</button>
							</>
					}
				{/* </div> */}
			</div>
			
			{/* menu for mobile and S: screens */}
			<div className="md:hidden block">
				<button onClick={dropDown} className="flex items-center px-3 py-2 text-[#E36414] hover:text-white hover:border-white">
					<i className="fas fa-bars"></i>
				</button>
			</div>

			{/* collapse and expand functionality for hamburger menu */}
			{isVisible ? (
				<div className="flex w-full block flex-grow items-center md: hidden">
					<div className="text-sm lg:flex-grow">
						<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
							<div>
								<Link to='/' onClick={clicked} className='flex place-items-center mt-4 lg:inline-block 
									lg:mt-0 text-[#E36414] hover:text-white'>Home
								</Link>
							</div>
						</button>

						{/* authentication check to determine what nav options are available */}
						{
							!isAuthenticated ?
								<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
									<div>
										<Link to='/' onClick={signInOnClick}
											className='flex place-items-center mt-4 lg:inline-block lg:mt-0 
											text-[#E36414] hover:text-white'
										>
											Login
										</Link>
									</div>
								</button>
								:
								<>
									<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
										<div>
											<Link to='/dashboard' onClick={clicked} className='flex place-items-center mt-4 lg:inline-block 
											lg:mt-0 text-[#E36414] hover:text-white'>Dashboard
											</Link>
										</div>
									</button>
									<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
										<div>
											<Link to='/' onClick={signOutOnClick} className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-[#E36414] hover:text-white'>
												Logout
											</Link>
										</div>
									</button>
								</>
						}
					</div>
				</div>
			) : (
				<></>
			)}
		</nav>
	)
}

export default Navbar;
