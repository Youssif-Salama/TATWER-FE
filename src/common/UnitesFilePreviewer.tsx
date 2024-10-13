import { FaEye, FaTrash } from "react-icons/fa6";

const UnitesFilePreviewer = ({ file,setFixedFiles,index }: any) => {
  const path = import.meta.env.VITE_BE_Domain + file?.path;
  const fileName = file?.name;

  const isImage = (path: string) =>
    /\.(png|jpg|jpeg|jif|jfif|gif|svg|webp)$/i.test(path);

  const isPdf = (path: string) => /\.pdf$/i.test(path);

  const isDocument = (path: string) => /\.(doc|docx)$/i.test(path);

  const isVideo = (path: string) => /\.(mp4|mkv|mov|avi|mp3)$/i.test(path);


  const handleDelete = () => {
    // @ts-ignore
    setFixedFiles((prev: any) => prev.filter((_, i: number) => i !== index));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFixedFiles((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, name: newName } : item
      )
    );
  };


  return (
    <div className="file-preview w-[150px] text-[12px] border-2 border-[#0077bc] shadow-md">
      {path && isImage(path) && (
        <div className="relative">
          <img
            src={path}
            alt="Preview"
            title="Image preview"
            className="object-cover w-[150px] h-[150px]"
          />
          <div
            className="absolute top-2 left-2 text-[#0077bc] bg-white rounded-full p-1 cursor-pointer"
            onClick={() => {
              window.open(path, "_blank");
            }}
          >
            <FaEye />
          </div>
          <div
          className="text-red-500 absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={()=>{
            handleDelete()
          }}
          >
            <FaTrash/>
          </div>
          <div>
            <input
              type="text"
              className="w-full outline-none border-0 p-1"
              placeholder={fileName}
              onChange={(e:any)=>{
                handleNameChange(e)
              }}
            />
          </div>
        </div>
      )}
      {path && isPdf(path) && (
        <div className="relative">
          <iframe
            src={path}
            title="PDF preview"
            className="object-cover w-[150px] h-[150px]"
          />
          <div
            className="absolute z-[50] top-2 left-2 text-[#0077bc] bg-white rounded-full p-1 cursor-pointer"
            onClick={() => {
              window.open(path, "_blank");
            }}
          >
            <FaEye />
          </div>
          <div
          className="text-red-500 absolute z-[50] top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={()=>{
            handleDelete()
          }}
          >
            <FaTrash/>
          </div>
          <div>
            <input
              type="text"
              className="w-full outline-none border-0 p-1"
              placeholder={fileName}
              onChange={(e:any)=>{
                handleNameChange(e)
              }}
            />
          </div>
        </div>
      )}
      {path && isDocument(path) && (
        <div className="relative">
          <iframe
            src={path}
            title="Document preview"
            className="object-cover w-[150px] h-[150px]"
          />
          <div
            className="absolute top-2 left-2 text-[#0077bc] bg-white rounded-full p-1 cursor-pointer"
            onClick={() => {
              window.open(path, "_blank");
            }}
          >
            <FaEye />
          </div>
          <div
          className="text-red-500 absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={()=>{
            handleDelete()
          }}
          >
            <FaTrash/>
          </div>
          <div>
            <input
              type="text"
              className="w-full outline-none border-0 p-1"
              placeholder={fileName}
              onChange={(e:any)=>{
                handleNameChange(e)
              }}
            />
          </div>
        </div>
      )}
      {path && isVideo(path) && (
        <div className="relative">
          <video
            src={path}
            controls
            title="Video preview"
            className="object-cover w-[150px] h-[150px]"
          />
          <div
            className="absolute top-2 left-2 text-[#0077bc] bg-white rounded-full p-1 cursor-pointer"
            onClick={() => {
              window.open(path, "_blank");
            }}
          >
            <FaEye />
          </div>
          <div
          className="text-red-500 absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={()=>{
            handleDelete()
          }}
          >
            <FaTrash/>
          </div>
          <div>
            <input
              type="text"
              className="w-full outline-none border-0 p-1"
              placeholder={fileName}
              onChange={(e:any)=>{
                handleNameChange(e)
              }}
            />
          </div>
        </div>
      )}
      {path &&
        !isImage(path) &&
        !isPdf(path) &&
        !isDocument(path) &&
        !isVideo(path) && (
          <p className=" bg-white p-2 text-red-500">نوع الملف غير مدعوم</p>
        )}
    </div>
  );
};

export default UnitesFilePreviewer;
