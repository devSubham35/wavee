import { NavbarProps } from '@/utils/types';
import { TbLayoutGridFilled, TbLayoutListFilled } from 'react-icons/tb';
import { IoMdAdd } from "react-icons/io";



const Navbar = ({ handleToggle, isGrid, onUpload }: NavbarProps) => {

    const navItems = [
        { id: 1, icon: <TbLayoutGridFilled className='text-[28px]' />, label: 'Grid View' },
        { id: 2, icon: <TbLayoutListFilled className='text-[24px]' />, label: 'List View' }
    ];


    return (
        <div className='w-full h-[60px] rounded-xl flex justify-between items-center'>
            <h1 className='text-[3rem] font-bold'>WAVEE</h1>

            <div className='flex items-center gap-3'>

                <button onClick={onUpload} className='px-5 py-3 font-semibold text-[14px] border-[1px] border-violet-950 rounded-full mr-4 flex 
                items-center gap-2 bg-gradient-to-r from-slate-900 to-violet-950 shadow-xl cursor-pointer active:scale-[0.9] duration-500'>
                <IoMdAdd className='text-[20px]' /> Upload Song
                </button>

                {navItems?.map(item => (
                    <div
                        key={item.id}
                        onClick={handleToggle}
                        className={`w-12 h-12 rounded-md flex justify-center items-center cursor-pointer 
                        ${isGrid === (item.icon.type === TbLayoutGridFilled) ? "text-white bg-white/[0.2]" : "text-white/20"}`}
                    >
                        {item.icon}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
