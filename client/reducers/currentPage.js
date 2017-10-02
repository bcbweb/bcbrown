const currentPage = (state = 0, action = {}) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return action.pageName;
    default:
      return state;
  }
};

export default currentPage;
