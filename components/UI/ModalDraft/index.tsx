import React from 'react';
import { twMerge } from 'tailwind-merge';


interface IProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode
    className?: string
}


function Modal({ isOpen, onClose, title, children, className = ' ' }: IProps) {
    return (
        <div className={`fixed inset-0 z-50 items-center justify-center overflow-auto bg-black bg-opacity-50 ${isOpen ? 'flex' : 'hidden'}`}>
            <div className={twMerge("relative py-10 px-4 bg-[#F0E5D8] dark:bg-[#B6B6B5] w-full max-w-[500px] rounded-lg", className)}>
                <button
                    type="button"
                    className="absolute top-0 right-0 mr-4 text-xl font-semibold text-gray-600 dark:text-white"
                    onClick={onClose}
                >
                    &times;
                </button>
                {title &&
                    <h1 className="text-3xl font-bold text-black mb-5">{title}
                    </h1>
                }

                {children}
            </div>
        </div>
    );
}

export default Modal;