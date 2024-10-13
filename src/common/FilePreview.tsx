import React from 'react';

interface FilePreviewProps {
  path: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ path }) => {
  const isImage = (path: string) =>
    /\.(png|jpg|jpeg|jif|jfif|gif|svg|webp)$/i.test(path);

  const isPdf = (path: string) => /\.pdf$/i.test(path);

  const isDocument = (path: string) => /\.(doc|docx)$/i.test(path);

  const isVideo = (path: string) =>
    /\.(mp4|mkv|mov|avi|mp3)$/i.test(path);

  return (
    <div className="file-preview max-h-[200px]">
      {path && isImage(path) && (
        <img
          src={path}
          alt="Preview"
          title="Image preview"
          style={{ maxWidth: '100%', height: 'auto' }}
          className="object-cover w-full"
        />
      )}
      {path && isPdf(path) && (
        <iframe
          src={path}
          title="PDF preview"
          style={{ width: '100%', height: '200px' }}
          className="object-cover w-full"
        />
      )}
      {path && isDocument(path) && (
        <iframe
          src={path}
          title="Document preview"
          style={{ width: '100%', height: '200px' }}
          className="object-cover w-full"
        />
      )}
      {path && isVideo(path) && (
        <video
          src={path}
          controls
          title="Video preview"
          style={{ width: '100%' }}
          className="object-cover w-full"
        />
      )}
      {
        path && !isImage(path) && !isPdf(path) && !isDocument(path) && !isVideo(path) && (
          <p className=' bg-white p-2 text-red-500'>نوع الملف غير مدعوم</p>
        )
      }
    </div>
  );
};

export default FilePreview;
