import React from 'react'
import { ShoppingCart,User,LogOut } from "lucide-react";
import{Link,NavLink,useNavigate} from 'react-router-dom'

export default function Header({user,setLogin,setSearchData,admin,setAdminLogin}) {
    const navigate = useNavigate();
    console.log(admin);
    const handleLogout = () => {
        // localStorage.clear();
        localStorage.removeItem('user');
        window.location.reload();
        setLogin(false);
    }
    const handleAdminLogout = () => {
        // localStorage.clear();
        localStorage.removeItem('admin');
        window.location.reload();
        setAdminLogin(false);
    }
    const handleSearch= async(e)=>{
        if(e.target.value.length >0){
            navigate('/search');
            await fetch(`http://localhost:8080/api/items/search?q=${e.target.value}`)
        .then((res)=>res.json())
        .then((data)=>{
        //   console.log(data); 
          setSearchData(data); 
        }).catch((err)=>{
            console.log(err);
        })   
        }
        else{
            navigate('/');
        }         
    }
    return (    
        <div>
            <nav className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0">
                <Link to={'/'}><h1 className="text-xl font-bold text-green-500 text-[2rem]">Kharido</h1></Link>
                <input
                    type="search"
                    placeholder="Search for products..."
                    className="border px-4 py-2 rounded-lg w-1/3"
                    onChange={handleSearch}
                />
                <div className="flex gap-9">
                  {admin?(''):( <Link to={user ? '/useracc' : '/login'}><button className="flex items-center gap-1 text-[1rem] text-blue-500" >
                        <User size={18} /> {user? user.username : 'User Login'}
                    </button></Link>)}

                   {user?(''):( <Link to={admin ? '/admin' : '/adminlogin'}><button className="flex items-center gap-1 text-[1rem] text-blue-500">
                        <User size={18} /> {admin? 'Admin':'Admin Login'}
                    </button></Link>)}

                    {user && (
                        <button onClick={handleLogout} className="flex items-center gap-2 text-red-600">logout<LogOut />
                        </button>
                    )}
                    {admin && (
                        <button onClick={handleAdminLogout} className="flex items-center gap-2 text-red-600">Admin   logout<LogOut />
                        </button>
                    )}

                   {admin?(''):(<Link to={'/cart'}>
                   <button className="flex items-center gap-1 text-dark-900 text-[1rem]">
                        <ShoppingCart size={18} /> Cart
                    </button>
                   </Link>)}
                </div>
            </nav>
            <nav className="flex justify-between items-center py-4 shadow-md bg-white h-[10vh] w-full  border-t-[2px] border-green-500 ">
                <div className='h-[10vh] w-full'>
                    <ul className="flex text-lg justify-around items-center w-full h-[10vh] flex-wrap">
                       <NavLink to={'/vegfru'}><li className='h-full p-2 hover:bg-green-500 hover:text-white rounded-lg'>Vegetables & Fruits</li></NavLink>
                       <NavLink to={'/munchies'}><li className='h-full p-2 hover:bg-green-500 hover:text-white rounded'>Munchies</li></NavLink>
                       <NavLink to={'/frozen'}><li className='h-full p-2 hover:bg-green-500 hover:text-white rounded'>Instant & Frozen Foods</li></NavLink>
                       <NavLink to={'/bakery'}><li className='h-full p-2 hover:bg-green-500 hover:text-white rounded'>Bakery & Biscuit</li></NavLink>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
