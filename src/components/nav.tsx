import Link from 'next/link';

export default function NavBar() {
  return (
    <div className='flex justify-center pt-10 gap-x-20 text-3xl bg-slate-800 text-white '>
      <Link className='hover:text-slate-200' href='/'>
        Home
      </Link>
      <Link className='hover:text-slate-200' href='/create'>
        Create
      </Link>
    </div>
  );
}
