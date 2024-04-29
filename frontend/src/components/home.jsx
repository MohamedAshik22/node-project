import { Link, Outlet } from 'react-router-dom';

const Home = () => {

    return (
        <div className="flex h-screen">
            <div className="flex-none  bg-blue-300 text-gray-600 w-1/5">
                <div className="px-6 py-4 lg:px-8 flex justify-between items-center">
                    <div className="text-lg font-bold">Profile Name</div>
                </div>
                <nav>
                    <ul className="py-4">
                        <li className="px-4 py-2 hover:bg-gray-400"> <button><Link to="/blogs">Blogs</Link></button></li>
                        <li className="px-4 py-2 hover:bg-gray-400"> <button>MyBlogs</button></li>
                        <li className="px-4 py-2 hover:bg-gray-400"> <button>Filter</button></li>
                    </ul>
                </nav>
            </div>
            <div className="flex-grow ">
                <div className="flex flex-col h-full">
                    <div className='flex items-center'>
                        <form className="mr-2" role="search">
                            <input type="search" placeholder="search" aria-label="search contact" className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                        </form>
                        <div> <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"><Link to="/blog/create">Create</Link></button> </div >
                    </div>
                    <div className="flex-grow overflow-y-auto">

                        <Outlet />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;
