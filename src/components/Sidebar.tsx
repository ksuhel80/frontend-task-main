import * as React from 'react';
import { Link } from 'react-router-dom';


export interface IAppProps {
}

export default    function Sidebar (props: IAppProps) {
  return (
    <div className='felx flex-row h-[100vh] bg-slate-200 p-4' >
      <div className=' mb-5 md:font-semibold'><Link to="/"> Contact </Link></div>
      <div className=' mb-5 md:font-semibold' ><Link to="/charts"> Charts And Maps </Link></div>
    </div>
  );
}
