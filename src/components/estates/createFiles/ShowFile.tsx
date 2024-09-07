import { Button } from '@/componentsShadcn/ui/button';
import React, { useState, useEffect } from 'react';

interface ShowFileProps {
  file: File | string | null;
}

const ShowFile: React.FC<ShowFileProps> = ({ file }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      if (typeof file === 'string') {
        // Handle case where file is a URL
        setFileUrl(file);
        setError(null);
      } else if (file instanceof File) {
        if (file.size === 0) {
          setError('File is empty.');
          setFileUrl(null);
          return;
        }

        if (!file.type) {
          setError('نوع الملف غير معروف');
          setFileUrl(null);
          return;
        }

        const validTypes = ['image/', 'application/pdf', 'text/'];
        const isValidType = validTypes.some(type => file.type.startsWith(type));

        if (!isValidType) {
          setError(`Unsupported file type: ${file.type}`);
          setFileUrl(null);
          return;
        }

        setError(null);

        const objectUrl = URL.createObjectURL(file);
        setFileUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
      } else {
        setFileUrl(null);
        setError('Invalid file type');
      }
    } else {
      setFileUrl(null);
      setError(null);
    }
  }, [file]);

  const renderFile = () => {
    if (!fileUrl) return null;

    if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
      // Handle external URLs
      const fileType = fileUrl.split('.').pop()?.toLowerCase();
      if (fileType === 'jpeg' || fileType === 'jpg' || fileType === 'png') {
        return <img src={fileUrl} alt="Loaded file" style={{ maxWidth: '100%', height: 'auto' }} />;
      } else if (fileType === 'pdf') {
        return (
          <iframe
            src={fileUrl}
            title="PDF viewer"
            style={{ width: '100%', height: '500px', border: 'none' }}
          />
        );
      } else if (fileType === 'txt') {
        return (
          <iframe
            src={fileUrl}
            title="Text viewer"
            style={{ width: '100%', height: '500px', border: 'none' }}
          />
        );
      } else {
        return <p>نوع الملف غير مدعوم: {fileType}</p>;
      }
    }

    // Handle blob URLs (for File objects)
    const fileType = (file instanceof File ? file.type : '');
    if (fileType.startsWith('image/')) {
      return <img src={fileUrl} alt="Loaded file" style={{ maxWidth: '100%', height: 'auto' }} />;
    } else if (fileType === 'application/pdf') {
      return (
        <iframe
          src={fileUrl}
          title="PDF viewer"
          style={{ width: '100%', height: '500px', border: 'none' }}
        />
      );
    } else if (fileType.startsWith('text/')) {
      return (
        <iframe
          src={fileUrl}
          title="Text viewer"
          style={{ width: '100%', height: '500px', border: 'none' }}
        />
      );
    } else {
      return <p>نوع الملف غير مدعوم: {fileType}</p>;
    }
  };

  return (
    <div className='flex items-center justify-center h-full text-[#0077bc] flex-col w-full gap-2 min-h-[70vh]'>
      <div className='h-full w-full flex items-center justify-center'>
        {error ? <p>{error}</p> : (file ? (fileUrl ? renderFile() : <p>جاري تحميل الملف...</p>) : <p>لاتوجد ملفات</p>)}
      </div>
      {file && fileUrl && (
        <Button
          type="button"
          onClick={() => {
            if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
              window.open(fileUrl, '_blank');
            } else {
              const objectUrl = URL.createObjectURL(file as File);
              window.open(objectUrl, '_blank');
              URL.revokeObjectURL(objectUrl);
            }
          }}
          className="mt-auto w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform"
        >
          عرض الملف
        </Button>
      )}
    </div>
  );
};

export default ShowFile;
