const compareSort = (a, b) => {
  if (a.sort < b.sort) {
    return -1;
  }
  if (a.sort > b.sort) {
    return 1;
  }
  return 0;
}

export default compareSort