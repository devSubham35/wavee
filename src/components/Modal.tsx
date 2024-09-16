'use client'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom';


const Modal = ({ children, showModal, setShowModal }: any) => {

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    return (
        <div className='w-full h-screen overflow-hidden'>
            {showModal && createPortal(
                <div className='fixed top-0 left-0 w-full h-screen z-10 bg-[#2424245e] 
                overflow-hidden flex justify-center items-center backdrop-blur-sm'>
                    <div className='flex justify-center items-center w-full'>
                        {children}
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}

export default Modal
// onClick={() => setShowModal(false)}