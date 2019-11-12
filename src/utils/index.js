const mask = (value) => (
  value
    .replace(/[^0-9.]|(?<=\.\d{2})\d*|\.(?=.*\.)/g, '')
    .replace(/^\./g, '0.')
);

export default mask;
