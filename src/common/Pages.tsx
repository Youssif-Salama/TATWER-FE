import  { useEffect, useState } from 'react';


const Pages = ({setPages,pages}:any) => {
  const [temp, setTemp] = useState(pages);


  useEffect(()=>{
    if(pages){
      setTemp(pages);
    }
  },[pages])


  useEffect(()=>{
    setPages(temp);
  },[temp])

  const handleCheckboxChange = (section: string, subSection: string, permission: string) => {
    setTemp((prevPages: any) => ({
      ...prevPages,
      [section]: {
        ...prevPages[section],
        [subSection]: {
          ...prevPages[section][subSection],
          [permission]: !prevPages[section][subSection][permission],
        },
      },
    }));
  };

  const toggleAll = (section:any) => {
    setTemp((prevPages:any) => ({
      ...prevPages,
      [section]: {
        ...prevPages[section],
        all: !prevPages[section].all,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-scroll relative">
      <div className="flex items-center gap-2 text-[10px] bg-[#0077bcb5] text-white p-1 sticky top-0">
        <div className="w-[20%]">الخدمه</div>
        <div className="grid-cols-4 grid w-[80%]">
          <div><label htmlFor="post">انشاء</label></div>
          <div><label htmlFor="delete">حذف</label></div>
          <div><label htmlFor="get">استعلام</label></div>
          <div><label htmlFor="put">تعديل</label></div>
        </div>
      </div>

      {/* Contracts Section */}
      <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]">العقود</div>
        <div className="grid-cols-4 grid w-[80%]">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="contractsAll"
              checked={temp.contracts.all}
              onChange={() => toggleAll('contracts')}
            />
            <label htmlFor="contractsAll">كل المهام</label>
          </div>
        </div>
      </div>

      {/* Tenants Permissions */}
      <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]">المؤجرين</div>
        <div className="grid-cols-4 grid w-[80%]">
          {['post', 'delete', 'get', 'put'].map(action => (
            <div key={action} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={`tenants-${action}`}
                checked={temp.contracts.tenants[action]}
                onChange={() => handleCheckboxChange('contracts', 'tenants', action)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Landlords Permissions */}
      <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]">المستأجرين</div>
        <div className="grid-cols-4 grid w-[80%]">
          {['post', 'delete', 'get', 'put'].map(action => (
            <div key={action} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={`landlords-${action}`}
                checked={temp.contracts.landlords[action]}
                onChange={() => handleCheckboxChange('contracts', 'landlords', action)}
              />
            </div>
          ))}
        </div>
      </div>


      {/* System Permissions */}
      <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]">الدفعات</div>
        <div className="grid-cols-4 grid w-[80%]">
          {['post', 'delete', 'get', 'put'].map(action => (
            <div key={action} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={`system-${action}`}
                checked={temp.systems.system[action]}
                onChange={() => handleCheckboxChange('systems', 'system', action)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Estates Section */}
      <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]">العقارات</div>
        <div className="grid-cols-4 grid w-[80%]">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="estatesAll"
              checked={temp.estates.all}
              onChange={() => toggleAll('estates')}
            />
            <label htmlFor="estatesAll">كل المهام</label>
          </div>
        </div>
      </div>

      {/* Estate Permissions */}
      <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]">العقار</div>
        <div className="grid-cols-4 grid w-[80%]">
          {['post', 'delete', 'get', 'put'].map(action => (
            <div key={action} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={`estate-${action}`}
                checked={temp.estates.estate[action]}
                onChange={() => handleCheckboxChange('estates', 'estate', action)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Estate Units Permissions */}
      <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]">وحدات العقار</div>
        <div className="grid-cols-4 grid w-[80%]">
          {['post', 'delete', 'get', 'put'].map(action => (
            <div key={action} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={`estateUnits-${action}`}
                checked={temp.estates.estateUnits[action]}
                onChange={() => handleCheckboxChange('estates', 'estateUnits', action)}
              />
            </div>
          ))}
        </div>
      </div>


      {/* Settings Section */}
      <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]">الإعدادات</div>
        <div className="grid-cols-4 grid w-[80%]">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="settingsAll"
              checked={temp.settings.all}
              onChange={() => toggleAll('settings')}
            />
            <label htmlFor="settingsAll">كل المهام</label>
          </div>
        </div>
      </div>

      {/* Payment Ways Permissions */}
      <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]">طرق الدفع</div>
        <div className="grid-cols-4 grid w-[80%]">
          {['post', 'delete', 'get', 'put'].map(action => (
            <div key={action} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={`paymentWays-${action}`}
                checked={temp.settings.paymentWays[action]}
                onChange={() => handleCheckboxChange('settings', 'paymentWays', action)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Taxes Permissions */}
      <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]">الضرائب</div>
        <div className="grid-cols-4 grid w-[80%]">
          {['post', 'delete', 'get', 'put'].map(action => (
            <div key={action} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={`taxes-${action}`}
                checked={temp.settings.taxes[action]}
                onChange={() => handleCheckboxChange('settings', 'taxes', action)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Employees Permissions */}
      <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]">الموظفين</div>
        <div className="grid-cols-4 grid w-[80%]">
          {['post', 'delete', 'get', 'put'].map(action => (
            <div key={action} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={`employees-${action}`}
                checked={temp.settings.employees[action]}
                onChange={() => handleCheckboxChange('settings', 'employees', action)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Remindings Permissions */}
      <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]">التذكيرات</div>
        <div className="grid-cols-4 grid w-[80%]">
          {['post', 'delete', 'get', 'put'].map(action => (
            <div key={action} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={`remindings-${action}`}
                checked={temp.settings.remindings[action]}
                onChange={() => handleCheckboxChange('settings', 'remindings', action)}
              />
            </div>
          ))}
        </div>
      </div>

        {/* Objects Permissions */}
        <div className="flex items-center gap-2 text-[10px]">
        <div className="w-[20%]"> الكيانات</div>
        <div className="grid-cols-4 grid w-[80%]">
          {['post', 'delete', 'get', 'put'].map(action => (
            <div key={action} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={`objects-${action}`}
                checked={temp.settings.objects[action]}
                onChange={() => handleCheckboxChange('settings', 'objects', action)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pages;
