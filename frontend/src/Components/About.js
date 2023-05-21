import React from 'react'

const About = () => {
  return (
    <div>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold">About Us</h1>
            <p className="mt-2 text-lg">
              BlockAuth is developed by following final year CSE students from Zeal College of Engineering and Research under the guidance of<span className='text-orange-700'> Prof. Dipali Mane</span>
              <ol className='text-xl'>
                <li className='text-blue-500'><a href="https://www.linkedin.com/in/yadavrajsky/"> Akash Yadav</a></li>
                <li className='text-blue-500'><a href="https://www.linkedin.com/in/rutuja-shevante-b184ba213/"> Rutuja Shevante</a></li>
                <li className='text-blue-500'><a href="https://www.linkedin.com/in/prathamesh-mane-9357b3190/"> Prathamesh Mane</a></li>
     
              </ol>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default About