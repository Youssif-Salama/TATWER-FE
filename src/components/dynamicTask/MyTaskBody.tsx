import { useEffect, useState } from "react";
import MessagesBody from "./chat/MessagesBody"
import SendMessage from "./chat/SendMessage"
import { GetMyTaskMessagesApi } from "@/api/messages/GetMyTaskMessagesApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { socket } from "@/utils/Sokect.io";

const MyTaskBody = () => {
  const [carryFiles, setCarryFiles] = useState<any>([]);
  const [allMessages, setAllMessages] = useState<any>([]);
  const {id:taskId}=useParams();
  const {refreshOnChangeMessages,refreshFileUploaderInSendMessage,refreshonDeleteMessage}=useSelector((state:any)=>state.GlobalReducer);
  // const [page,setPage]=useState<any>(1);

    const getAllMessagesPerTask=async()=>{
await GetMyTaskMessagesApi(taskId,setAllMessages);
    }


    useEffect(() => {
      getAllMessagesPerTask();
    }, [refreshOnChangeMessages,refreshFileUploaderInSendMessage,refreshonDeleteMessage]);


    socket.on("refreshData",(data)=>{
      if(data){
        getAllMessagesPerTask();
      }
    })



  return (
    <div className="mb-4">
      <MessagesBody carryFiles={carryFiles} setCarryFiles={setCarryFiles} allMessages={allMessages}/>
      <SendMessage setCarryFiles={setCarryFiles}  carryFiles={carryFiles}/>
    </div>
  )
}

export default MyTaskBody
