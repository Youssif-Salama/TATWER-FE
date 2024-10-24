import { SendFileAsMessage } from '@/api/messages/SendFileAsMessage';
import { SendMessageApi } from '@/api/messages/SendMessageApi';
import { decodeToken } from '@/methods/GlobalMethods';
import { setRefreshOnChangeMessages } from '@/store/slices/GlobalSlice';
import { AppDispatch, RootState } from '@/store/store';
import { socket } from '@/utils/Sokect.io';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { FaPaperclip } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SendMessage = ({ setCarryFiles, carryFiles }: { setCarryFiles: any, carryFiles: any }) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentEmpData, setCurrentEmpData] = useState<any>(null);
  const {id:taskId}=useParams();
 // @ts-ignore
  const {refreshFileUploaderInSendMessage,refreshFilesOnDeleteOneFile}:any=useSelector((state:RootState)=>state.GlobalReducer);
  const dispatch:AppDispatch=useDispatch()

  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setCurrentEmpData(decodedToken);
      }
    }
  }, [token]);


  useEffect(()=>{
    setCarryFiles(files)
  },[files])


  useEffect(()=>{
    document.querySelectorAll("input").forEach(element => {
      element.value = "";
    });

    setCarryFiles(null);
    setMessage('');
    setFiles(null);
    setError(null);
  },[refreshFileUploaderInSendMessage])

  const handleSendMessage = async () => {
    if (message.trim() && !files) {

        const data = {
          Message: message,
          TaskId: taskId,
          EmpId: currentEmpData?._id,
          Type: "message"
        };
        await SendMessageApi(data, setLoading);
        setMessage('');
        setFiles(null);
        setError(null);
        document.querySelectorAll("input").forEach(element => {
          element.value = "";
        });
        dispatch(setRefreshOnChangeMessages(Math.random()));
        socket.emit("messageSent","refreshData");
    }
    else{
        const formData=new FormData();
        formData.append("Type","message")
        formData.append("FileMessage",message);
         // @ts-ignore
        Object.entries(carryFiles).forEach(([key, value]:any) => {
          formData.append("File", value);
        })

        await SendFileAsMessage(formData, setLoading,taskId);
        setMessage('');
        setFiles(null);
        setError(null);
        document.querySelectorAll("input").forEach(element => {
          element.value = "";
        });
        dispatch(setRefreshOnChangeMessages(Math.random()));
        socket.emit("messageSent","refreshData");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files || null;
    setFiles(selectedFile);
  };

  return (
    <div className="flex items-center p-2 border gap-2 w-full bg-gray-100 my-4 shadow-sm">
      <label htmlFor="file-upload" className="cursor-pointer">
        <FaPaperclip className="text-gray-600 text-xl hover:text-gray-800 transition-colors" />
        <input
          id="file-upload"
          multiple
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <textarea
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="اكتب ملاحظتك هنا"
        className="flex-grow p-2 border rounded-md ml-2"
      />
      <button
        onClick={handleSendMessage}
        disabled={loading}
        className={`ml-2 p-2 rounded-md transition-colors ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0077bc] text-white hover:bg-[#005fa3]'
        }`}
      >
        {loading ? 'Sending...' : <AiOutlineSend className="text-xl" />}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default SendMessage;
