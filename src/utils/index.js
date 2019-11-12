const mask = (value) => {
  return value
    .replace(/,/g, '.')
    .replace(/^\./g, '0.')
    .replace(/[^0-9.]|(?<=\.\d{2})\d*|\.(?=.*\.)/g, '')
};

export default mask;
