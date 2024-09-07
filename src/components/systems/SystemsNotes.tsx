const SystemsNotes = () => {
  return (
    <div className="rounded-2xl border-2 p-1 bg-[#80bbde] font-bold ">
      <ul className="rounded-2xl border-2 p-3 text-sm list-disc list-inside ">
        <li className="text-red-500">باقي عليها 5 ايام او اقل</li>
        <li className="text-yellow-500">باقي عليها 15 ايام او اقل</li>
        <li className="text-green-600">باقي عليها 40 ايام او اقل</li>
        <li className="text-amber-900">عدا عليها اقل من 30 يوم</li>
        <li className="text-black">عدا عليها اكثر من 30 يوم</li>
      </ul>
    </div>
  );
};

export default SystemsNotes;
