import { Link } from 'react-router-dom';

import Background from '../assets/images/row_of_cars.jpeg';

function Home() {
  return (
    <div
      style={{ backgroundImage: `url(${Background})` }}
      className='bg-cover min-h-screen'
    >
      <div className='flex flex-col pt-12 space-y-4 items-center'>
        <div className="w-1/2 p-1 md:p-2 border-4 border-burgundy rounded-md bg-white bg-opacity-75">
          <p className="text-dark_seafoam rounded-md text-md md:text-2xl">
            Welcome!
            Come explore the Virginia State Car Collector's Club
          </p>
        </div>
        <div className='w-1/2 p-1 md:p-2 rounded-md border-4 border-burgundy bg-white bg-opacity-75'>
          <p className='text-center text-dark_seafoam text-md md:text-xl'>
            On the
            <Link to='/dashboard' className='text-blue-600 font-bold'>
              <i> Dashboard</i>
            </Link>
            , you will be able to find a list of cars in my inventory 
            and some basic details about them. 
          </p>
        </div>
        <div className='w-1/2 p-1 md:p-2 rounded-md border-4 border-burgundy bg-white bg-opacity-75'>
          <p className='text-center text-dark_seafoam text-md md:text-xl'>
            If this is your first time visiting this page, please click the Login 
            button above. You will be able to create an account form there. 
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
