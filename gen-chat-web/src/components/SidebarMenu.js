import {useState} from 'react'
import svgs from '../assets/svgs';
import parse from 'html-react-parser';
// import { auth } from '../firebase/config';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import InitialIcon from './InitialIcon';

export default function SidebarMenu({user}) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  console.log("User");
  console.log(user);

  const signOut = () => {
    console.log("Pressed Sign Out");
    navigate('/', {user: null});
  };
  
  return (
    <div className="flex">
      <div className={` ${open ? "w-72" : "w-20 "} bg-blue-400 h-screen p-5 relative duration-300`} >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className={`absolute cursor-pointer -right-3 top-9 w-6 border-blue-400 border-2 rounded-full ${!open && "rotate-180"} bg-blue-400`} onClick={() => setOpen(!open)}>
          <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 duration-500 ${!open && "rotate-[360deg]"}`}
              >
                { parse (svg.src) }
              </svg>
          
              <span className={`${!open && "hidden"} origin-left duration-200 text-white`}>
                {svg.key}
              </span>
            </li>
            ))
          }

          <li className='mt-auto flex items-center gap-4' onClick={()=>document.getElementById('my_modal_3').showModal()}>
            <InitialIcon size={10} initials={user.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()} />
            <div>
              <p className={`${!open && "hidden"} text-white font-medium text-xl`}>{user.name}</p>
            </div>
          </li>
          <dialog id="my_modal_3" className="modal">
                {/* <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div> */}
                   <div className="card card-compact w-96 bg-base-100 shadow-xl">
                      <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                      <div className="avatar -top-3 left-2">
                        <div className="w-24 rounded-full border-2  border-white ">
                          <InitialIcon size={24} initials={user.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()} />
                          
                        </div>
                            <h2 className="card-title ">{user.name}</h2> 
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 " strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg> */}

                         </div>
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                          </form>                      
                    <div className="card-body">
                        <h3 className="card-title">Thông tin cá nhân</h3>
                        
                        <p>Giới tính:</p>
                        <p>Ngày sinh:</p>
                        <p>Điện thoại: {user.phoneNumber}</p>
                        
                        
                          <div className="card-actions justify-end">
                            <button className="btn btn-primary">Cập nhật</button>
                          </div>
                    </div>
                  </div>
          </dialog>
        </ul>
      </div>
    </div>
  )
}
