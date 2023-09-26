import Link from 'next/link'

function Nav() {
  return (
    <header className='border-b sticky top-0 z-20 bg-white'>
      <div className='flex items-center justify-between max-w-6xl px-3 pt-4 pb-2 mx-auto lg:max-w-screen-xl'>
        <Link href="/" passHref>
          <span className='text-lg pt-1 font-bold cursor-pointer'>
            Shopify + Next.js
          </span>
        </Link>
        <span className='text-md font-bold cursor-pointer'>
          Cart
        </span>
      </div>
    </header>
  )
}

export default Nav