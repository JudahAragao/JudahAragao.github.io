'use client'

import Image from 'next/image';

const Header = () => {
    return <header className="w-full h-[64px] flex items-center justify-center">
        <div className='w-[911px] max-w-[911px] min-w-[200px]'>
            <Image 
                src='/logo.png'
                alt='my logo'
                width={200}
                height={42.26}
            />
        </div>
    </header>
}

export default Header;