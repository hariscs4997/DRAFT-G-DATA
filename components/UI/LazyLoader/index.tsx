import React from 'react'

const Skeleton = () => {
    return (
            <div role="status" className="max-w-full  p-4  mt-10 mx-5 animate-pulse md:p-6 dark:border-gray-700 h-full">
                <div className='flex justify-between w-full'>
                    <div>
                        <div className="h-2.5 bg-zinc-300   rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                        <div className="w-48 h-2 mb-10 bg-zinc-300   rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div>
                        <div className="h-2.5 bg-zinc-300   rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                        <div className="w-48 h-2 mb-10 bg-zinc-300  rounded-full dark:bg-gray-700"></div>
                    </div>
                </div>

                <div className="w-100 h-6 mb-10 bg-zinc-300  rounded-full dark:bg-gray-700 justify-center flex"></div>

            <div className="flex items-baseline mt-4 bg-zinc-300 max-h-[500px] h-full">
                    <div className="w-full bg-zinc-300   rounded-t-lg h-72 dark:bg-gray-700"></div>
                    <div className="w-full h-56 ms-6 bg-zinc-300   rounded-t-lg dark:bg-gray-700"></div>
                    <div className="w-full bg-zinc-300  rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                    <div className="w-full h-64 ms-6 bg-zinc-300   rounded-t-lg dark:bg-gray-700"></div>
                    <div className="w-full bg-zinc-300  rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                    <div className="w-full bg-zinc-300  rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                    <div className="w-full bg-zinc-300  rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                </div>
        </div>
    )
}
export default Skeleton