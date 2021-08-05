type DateEnum = {
  value: number;
  label: string;
};

export const days: DateEnum[] = [
  { value: 0, label: "Søndag" },
  { value: 1, label: "Mandag" },
  { value: 2, label: "Tirsdag" },
  { value: 3, label: "Onsdag" },
  { value: 4, label: "Torsdag" },
  { value: 5, label: "Fredag" },
  { value: 6, label: "Lørdag" },
];

export const months: DateEnum[] = [
  { value: 0, label: "Januar" },
  { value: 1, label: "Februar" },
  { value: 2, label: "Mars" },
  { value: 3, label: "April" },
  { value: 4, label: "Mai" },
  { value: 5, label: "Juni" },
  { value: 6, label: "Juli" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "Oktober" },
  { value: 10, label: "November" },
  { value: 11, label: "Desember" },
];

export const simpleFormatDate = (date: Date) => {
  const month = months
    .find((month) => month.value === date.getMonth())
    ?.label.toLowerCase();
  return date.getDate() + ". " + month + " " + date.getFullYear();
};

export const formatDate = (date: Date) => {
  const day = days.find((day) => day.value === date.getDay())?.label;
  const month = months.find((month) => month.value === date.getMonth())?.label;
  return (
    day! +
    " " +
    date.getDate() +
    ". " +
    month?.toLowerCase() +
    " " +
    date.getFullYear()
  );
};
