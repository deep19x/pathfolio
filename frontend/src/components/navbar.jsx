import { TicketsPlane, UserLock, LogOut, Search,Map,Compass } from 'lucide-react'
import { useNavigate,useLocation,Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { logoutUser } from '../services/auth'

export default function Navbar() {
    
    const {user,loading} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async() => {
        try {
            await logoutUser();
            navigate('/login');
        }catch(error){
            console.error('Logout failed',error);
        }
    }

    const isActive = (path) => location.pathname === path;
    
    return (
        <div className="w-full bg-white h-20 flex gap-4 justify-between items-center px-4 md:px-10 shadow-md ">
            <div className='flex gap-2 items-center cursor-pointer' onClick={() => navigate('/')}>
                <div >
                    <TicketsPlane size={35} className='text-blue-600' />
                </div>
                <div className='font-semibold text-xl md:text-2xl tracking-widest'>
                    Pathfolio
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <Link to={'/trips'} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm font-medium ${isActive('/trips') ? 'bg-blue-600 text-white': 'text-gray-500 hover:bg-gray-100'}`}>
                    <Map size={16}/>
                    My Trips
                </Link>

                <Link
                    to='/explore'
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm font-medium
                        ${isActive('/explore')
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                >
                    <Compass size={16} />
                    Explore
                </Link>
            </div>
            <form className='relative hidden md:block'>
                <Search size={18} className='absolute left-3 top-3 text-gray-400' />
                <input type="text" placeholder='Search trips...' className='pl-10 pr-4 py-2 w-72 lg:w-96 border rounded-full focus:outline-none focus:ring-blue-400 ' />
            </form>
            <div className='flex gap-4 items-center md:gap-6'>
                <UserLock className='cursor-pointer hover:text-blue-600 transition' />
                {
                    loading ? (
                        <div className='w-20 h-4 bg-gray-200 rounded animate-pulse '></div>
                    ) : (
                        <p className='text-sm font-medium'>{user?.name}</p>
                    )
                }
                <LogOut className='cursor-pointer hover:text-red-600 transition' />
            </div>
        </div>
    )
}