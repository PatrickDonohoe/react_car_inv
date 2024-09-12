import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const mobileMediaQuery = '(max-width: 750px)'

function Navbar() {

	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	const [isVisible, setIsVisible] = useState(false);
	const [isSmall, setIsSmall] = useState(window.matchMedia(mobileMediaQuery).matches);

	useEffect(() => {
		const query = window.matchMedia(mobileMediaQuery);

		function handleQueryChange(queryEvent: { matches: boolean | ((prevState: boolean) => boolean); }) {
			setIsSmall(queryEvent.matches);
		}

		query.addEventListener('change', handleQueryChange);

		return () => {
			query.removeEventListener('change', handleQueryChange);
		};
	}, []);

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
		<nav className="top-0 w-full flex sticky z-2 items-center justify-around bg-[#0F4C5C] px-6">
			<div className="flex items-center shrink-0 text-[#E36414]">
				<Link to='/' className='font-semibold text-xl'>Car Inventory</Link>
			</div>



			{/* if the window is small & dropDown is true, display menu with icons only */}
			{
				(isSmall && isVisible) ?
					(
						<div className="flex w-full flex-grow items-center justify-around">
							<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
								<div>
									<Link to='/' onClick={clicked} className='flex place-items-center lg:inline-block 
									lg:mt-0 text-[#E36414] hover:text-white'
									>
										<i className='fa-solid fa-house'></i>
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
												<i className='fa-solid fa-right-to-bracket'></i>
											</Link>
										</div>
									</button>
									:
									<>
										<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
											<div>
												<Link to='/dashboard' onClick={clicked} className='flex place-items-center lg:inline-block 
											lg:mt-0 text-[#E36414] hover:text-white'
												>
													<i className="fa-solid fa-table-columns"></i>
												</Link>
											</div>
										</button>
										<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
											<div>
												<Link to='/' onClick={signOutOnClick} className='flex place-items-center 
											lg:inline-block lg:mt-0 text-[#E36414] hover:text-white'
												>
													<i className='fa-solid fa-door-open'></i>
												</Link>
											</div>
										</button>
									</>
							}

						</div>
					)
					: (<></>)
			}

			{/* if isSmall, show hamburger, else show full navbar */}
			{isSmall ?
				<div className="md:hidden block">
					<button onClick={dropDown} className="flex items-center px-3 py-2 text-[#E36414] hover:text-white hover:border-white">
						<i className="fas fa-bars"></i>
					</button>
				</div>
				:
				(
					<div className="flex w-full flex-grow items-center justify-around">
						<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
							<div>
								<Link to='/' onClick={clicked} className='flex place-items-center lg:inline-block 
											lg:mt-0 text-[#E36414] hover:text-white'
								>
									<i className='fa-solid fa-house'></i> Home
								</Link>
							</div>
						</button>

						{
							!isAuthenticated ?
								(
									<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
										<div>
											<Link to='/' onClick={signInOnClick}
												className='flex place-items-center lg:inline-block lg:mt-0 
														text-[#E36414] hover:text-white'
											>
												<i className='fa-solid fa-right-to-bracket'></i> Login
											</Link>
										</div>
									</button>
								)
								:
								<>
									<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
										<div>
											<Link to='/dashboard' onClick={clicked} className='flex place-items-center lg:inline-block 
													lg:mt-0 text-[#E36414] hover:text-white'
											>
												<i className="fa-solid fa-table-columns"></i> Dashboard
											</Link>
										</div>
									</button>
									<button className="p-3 m-5 bg-[#5F0F40] justify-center border-red-900 border-2">
										<div>
											<Link to='/' onClick={signOutOnClick} className='flex place-items-center 
													lg:inline-block lg:mt-0 text-[#E36414] hover:text-white'
											>
												<i className='fa-solid fa-door-open'></i>	Logout
											</Link>
										</div>
									</button>
								</>
						}

					</div>
				)
			}
		</nav>
	)
}

export default Navbar;
