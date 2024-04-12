import {useState} from 'react'
import svgs from '../assets/svgs';
import parse from 'html-react-parser';
// import { auth } from '../firebase/config';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function SidebarMenu({user}) {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  console.log("Side bar menu");
  console.log(user);

  const signOut = () => {
    console.log("Pressed Sign Out");
    navigate('/', {user: null});
  };
  
  return (
    <div className="flex">
      <div className={` ${open ? "w-72" : "w-20 "} bg-blue-400 h-screen p-5 relative duration-300`} >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className={`absolute cursor-pointer -right-3 top-9 w-6 border-blue-400 border-2 rounded-full ${!open && "rotate-180"} bg-blue-400`} onClick={() => setOpen(!open)}>
          <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
        </svg>
        
        {/* Thuong hieu */}
        <div className="flex gap-x-4 items-center">
          <img src={logo} alt='' className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
          
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`} >
            Gen Chat
          </h1>
        </div>

        {/* Thong tin ben trong */}
        <ul className="pt-10 h-screen flex-col">
          {svgs.map((svg, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-xl items-center gap-x-4 mt-2`}
              onClick={() => {
                if (svg.onClick == "signOut")
                  signOut();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`w-6 h-6 duration-500 ${!open && "rotate-[360deg]"}`}
              >
                { parse (svg.src) }
              </svg>
          
              <span className={`${!open && "hidden"} origin-left duration-200 text-white`}>
                {svg.key}
              </span>
            </li>
            ))
          }

          <li className='mt-auto flex items-center gap-4'>
            <img className='aspect-square h-10 w-10 rounded-full' src='https://lh3.googleusercontent.com/a/ACg8ocLlO1pfA9KPIKdD6CNveeOZ6F7MzO8OPni_FMqOHqjx=s96-c'></img>
            <div>
              <p className={`${!open && "hidden"} text-white font-medium text-xl`}>{user.name}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
