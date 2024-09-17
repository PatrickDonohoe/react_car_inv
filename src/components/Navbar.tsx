import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import ClickButton from './ClickButton';

const mobileMediaQuery = '(max-width: 767px)'

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
		<nav className="top-0 w-full flex sticky z-10 items-center justify-around bg-[#0F4C5C] px-4">
			<div className="flex items-center shrink-0 text-[#E36414]">
				<Link to='/' className='font-semibold text-xl'>Car Inventory</Link>
			</div>



			{/* if the window is small & dropDown is true, display menu with icons only */}
			{
				(isSmall && isVisible) ?
					(
						<div className="flex w-full flex-grow justify-center items-center 
							border-4 mx-2 border-burgundy rounded-md">
							<ClickButton
								icon='fa-solid fa-house'
								route='/'
								linkText=' Home'
								onClick={clicked}
							/>
							{
							!isAuthenticated ?
								<ClickButton
									icon='fa-solid fa-right-to-bracket'
									route='/'
									linkText=' Login'
									onClick={signInOnClick}
								/>
								:
								(
									<div>
										<ClickButton
											icon='fa-solid fa-table-columns'
											route='/dashboard'
											linkText=' Dashboard'
											onClick={clicked}
										/>
										<ClickButton
											icon='fa-solid fa-door-open'
											route='/'
											linkText=' Logout'
											onClick={signOutOnClick}
										/>
									</div>
								)
							}
						</div>
					)
					: (<></>)
			}

			{/* if isSmall, show hamburger, else show full navbar */}
			{isSmall ?
				(
					<div className="block">
						<button onClick={dropDown} className="flex items-center px-3 py-2 text-[#E36414] hover:text-white hover:border-white">
							<i className="fas fa-bars"></i>
						</button>
					</div>
				)
				:
				(
					<div className="flex w-full flex-grow items-center justify-around">
						<ClickButton
							icon='fa-solid fa-house'
							route='/'
							linkText=' Home'
							onClick={clicked}
						/>

						{
							!isAuthenticated ?
								(
									<ClickButton 
										icon='fa-solid fa-right-to-bracket'
										route='/'
										linkText=' Login'
										onClick={signInOnClick}
									/>
								)
								:
								<>
									<ClickButton 
										icon='fa-solid fa-table-columns'
										route='/dashboard'
										linkText=' Dashboard'
										onClick={clicked}
									/>
									<ClickButton 
										icon='fa-solid fa-door-open'
										route='/'
										linkText=' Logout'
										onClick={signOutOnClick}
									/>
								</>
						}

					</div>
				)
			}
		</nav>
	)
}

export default Navbar;
