
//that method to catch one file change on file upload input
export const handleOneFileChange = (e:any,catchONeFile:any)=>{
  catchONeFile(e.target.files[0]);
}


//that method to catch selected file name
export const handleOneFileNameChange = (e:any,catchONeFileName:any)=>{
  catchONeFileName(e.target.value);
}


export const countResetDaysAndColors = (date: any) => {
  // Normalize both dates to midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00

  const dueDate = new Date(date);
  dueDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

  // Calculate difference in milliseconds
  //@ts-ignore
  const diff = dueDate - today;

  // Convert milliseconds to days
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (day <= -30) { // Range 1: [-∞, -30]
    return {
      color: "text-black",
      days: day,
      situation: "متأخره"
    };
  } else if (day > -30 && day < 0) { // Range 3: ]-30, 0[
    return {
      color: "text-amber-900",
      days: day,
      situation: "متأخره"
    };
  } else if (day >= 0 && day <= 5) { // Range 4: ]0, 5]
    return {
      color: "text-red-500",
      days: day,
      situation: "مستحقه"
    };
  } else if (day > 5 && day <= 15) { // Range 5: ]5, 15]
    return {
      color: "text-yellow-500",
      days: day,
      situation: "قريبه الاستحقاق"
    };
  } else if (day > 15 && day <= 40) { // Range 6: ]15, 40]
    return {
      color: "text-green-500",
      days: day,
      situation: "مرحله المطالبه"
    };
  } else { // Default case if it doesn't match any range
    return {
      color: "text-[#0077bc]",
      days: day,
      situation: "لم تستحق بعد"
    };
  }
};
