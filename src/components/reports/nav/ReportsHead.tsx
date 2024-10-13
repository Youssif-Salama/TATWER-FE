import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

const ReportsHead = ({message}: {message:string}) => {
  return (
    <div className="flex items-center justify-between text-[12px] mb-6">
      <div className='text-[#0077bc] underline'>{message}</div>
      <Link to="/reports" className="flex items-center gap-1">
        <div>العوده</div>
        <div><IoIosArrowRoundBack className='text-[14px]'/></div>
      </Link>
      </div>
  )
}

export default ReportsHead
