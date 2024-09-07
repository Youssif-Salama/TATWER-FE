export const customStyles = {
  cells: {
    style: {
      borderRightStyle: 'solid',
      borderRightWidth: '1px',
      padding: '8px',
    },
  },
  rows: {
    style: {
      minHeight: '20px',
    },
  },
};




export const customStylesSystems = {
  cells: {
    style: {
      '&:not(:last-of-type)':{
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        padding: '8px',
      }
    },
  },
  rows: {
    style: {
      minHeight: '20px',
    },
  },
};
