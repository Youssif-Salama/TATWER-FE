import { useEffect, useRef, useState } from "react"
import { FaTrash } from "react-icons/fa6";

const ContractMoreEmails = ({formik,currentMoreEmail}:{formik:any,currentMoreEmail:any}) => {
  const [emails,setEmails]=useState<string[]|null>(null);
  const [currentEmail,setCurrentEmail]=useState<string|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onclickAddEmail=()=>{
    if(currentEmail && !emails?.includes(currentEmail)){
      if(emails==null){
        setEmails([currentEmail])
      }
      else{
        setEmails([...emails,currentEmail])
      }
      setCurrentEmail(null)
     if(inputRef.current){
       inputRef.current?.focus()
      inputRef.current.value=""
     }
    }
  }

  useEffect(()=>{
    formik.setFieldValue("MoreEmails",emails);
  },[emails])

  useEffect(() => {
      setEmails(currentMoreEmail );
  }, [currentMoreEmail]);

  return (
    <div>
      <div className="grid grid-cols-4 text-[14px]">
        <div className="col-span-3">
          <input type="email" className="p-2 border-2 border-slate-200 w-full h-full" ref={inputRef}
          placeholder="اكتب بريد الكتروني هنا ثم اضغط اضافه"
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setCurrentEmail(e.target.value)
          }}
          />
        </div>
        <div className="col-span-1 bg-[#0077bc] flex items-center justify-center text-white h-full cursor-pointer hover:opacity-95"
        onClick={onclickAddEmail}
        >
          اضافه
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap mt-2">
        {
          emails?.map((email,index)=>{
            return (
              <div key={index} className="text-[#0077bc] text-[12px] border p-2 relative">
                {email}
                <div className="bg-red-500 text-white p-1 rounded-full absolute -top-1 -right-1 text-[8px] hover:scale-105"
                onClick={()=>{
                  setEmails(emails?.filter((item)=>item!=email))
                  if(emails?.length==1){
                    setEmails(null)
                  }
                }}
                >
                  <FaTrash/>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ContractMoreEmails
