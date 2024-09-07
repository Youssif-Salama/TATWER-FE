import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ContractAddressMap = ({ formik }: { formik: any }) => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const {mapLocation}=useSelector((state:RootState)=>state.GlobalReducer);
    const handleMapClick = (e: L.LeafletMouseEvent) => {
        setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    };

    useEffect(() => {
        if (location) {
            formik.setFieldValue('lat', location.lat);
            formik.setFieldValue('lang', location.lng);
        }
    }, [location])

    return (
        <div className='flex flex-col items-center'>
            <div className='mb-6'>
                <h1 className='font-bold text-[#0077bc] border-[#0077bc] border-b-2'>
                    اختر عنوانا من الخريطه بالاسفل
                </h1>
            </div>
            <MapContainer
                center={[21.43095606498449, 39.81359045213398]}
                zoom={13}
                style={{ height: '500px', width: '100%' }}
                // @ts-ignore
                whenReady={(map: any) => {
                    console.log('Map created');
                    map.target.on('click', handleMapClick);
                }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© OpenStreetMap contributors'
                />
                {location && (
                    <Marker position={[location.lat, location.lng]}>
                    </Marker>
                )}
            </MapContainer>
            <div className='my-6'>
                {
                    location && (
                        <div>
                            <div className='flex items-center justify-around gap-2'>
                                <div className='bg-[#0077bc] text-white p-2'>الموقع الجديد</div>
                                <div className='bg-[#0077bc] text-white p-2'>

                                    دائره عرض: {location.lat}
                                </div>
                                <div className='bg-[#0077bc] text-white p-2'>

                                    خط الطول: {location.lng}
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    mapLocation && (
                        <div className='mt-6'>
                            <div className='flex items-center justify-around gap-2'>
                                <div className='bg-[#0077bc] text-white p-2'>الموقع الحالي</div>
                                <div className='bg-[#0077bc] text-white p-2'>

                                    دائره عرض: {mapLocation.lat}
                                </div>
                                <div className='bg-[#0077bc] text-white p-2'>

                                    خط الطول: {mapLocation.lng}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="w-full">
                {
                    formik.errors && formik.errors.lang || !formik.errors && formik.errors.lat ? (
                        <div className='text-red-500 bg-red-300 w-full text-center px-1 py-4 font-semibold'>
                            يجب عليك اختيار موقع
                        </div>

                    )
                        : null
                }
            </div>
        </div>
    );
};

export default ContractAddressMap;
