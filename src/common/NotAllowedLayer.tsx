interface NotAllowedLayerProps {
  message?: string;
}

const NotAllowedLayer: React.FC<NotAllowedLayerProps> = ({ message }) => {
  return (
    <div className="p-4 border-2 flex items-center justify-center bg-gray-100 text-center">
      <span className="mx-1">ليس لديك الصلاحيات اللازمة </span>
      {message && <span className="ml-2"> {message}</span>}
    </div>
  );
};

export default NotAllowedLayer;
