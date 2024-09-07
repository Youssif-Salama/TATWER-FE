import { Button } from "@/componentsShadcn/ui/button";
import { setRefreshEstateFiles } from "@/store/slices/GlobalSlice";
import { AppDispatch } from "@/store/store";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";

const AddedFileList = ({
  allFiles,
  names,
  setSelectedFileToShow,
  catchAllFiles,
  catchAllNames,
  selectedFileToShow,
}: {
  allFiles: any;
  names: any;
  setSelectedFileToShow: any;
  catchAllFiles: any;
  catchAllNames: any;
  selectedFileToShow: any;
}) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="w-full flex flex-col min-h-[70vh]">
      <div>
        {allFiles.map((file: any, index: number) => (
          <div
            key={index}
            className="flex justify-between p-4 border-b-2 border-[#0077bc] w-full"
          >
            <p>{names[index]}</p>
            <div className="flex gap-2">
              <button
                className="p-1 text-white bg-[#0077bc]"
                onClick={() => {
                  setSelectedFileToShow(file);
                }}
              >
                <FaEye />
              </button>
              <button
                className="p-1 text-white bg-red-500"
                onClick={() => {
                  catchAllFiles([
                    ...allFiles.slice(0, index),
                    ...allFiles.slice(index + 1),
                  ]);
                  catchAllNames([
                    ...names.slice(0, index),
                    ...names.slice(index + 1),
                  ]);
                  if (file == selectedFileToShow) {
                    setSelectedFileToShow(null);
                  }
                  dispatch(setRefreshEstateFiles(Math.random()));
                }}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Button
        type="submit"
        className="mt-auto w-full bg-red-500 rounded-none hover:bg-red-400 transition ease-in-out duration-300 transform flex items-center justify-center"
        onClick={() => {
          catchAllFiles([]);
          catchAllNames([]);
          setSelectedFileToShow(null);
          dispatch(setRefreshEstateFiles(Math.random()));
        }}
      >
        حذف جميع الملفات
      </Button>
    </div>
  );
};

export default AddedFileList;
