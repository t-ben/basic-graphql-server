const DataLoader = require('dataloader');

/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */

// helper func to reorder result by the input id's
const orderItemsByIds = (items, sortingIds) => {
  const sorting = sortingIds.slice(0); // clone the array since we will destroy it sloly.
  const result = items.map((item) => {
    const n = sorting.indexOf(item.id);
    sorting[n] = '';
    return [n, item]; // return a 2 cells array for each item with its sorting position n
  })
    .sort((a, b) => {
      if (a[0] < b[0]) return -1;
      if (a[0] > b[0]) return 1;
      return 0;
    }) // sort items by the sorting position n (first element in each sub array)
    .map((j) => j[1]); // extract only the item-obj out of each 2 cell array.
  return result;
};

/*
  data loader functions - note we have to return the items in the same order of the given id's
  data - injected
*/
module.exports = data => {
  const getParentsByIds = async (parentsIds) => {
    return new Promise((resolve, reject) => {
      const parents = data.getAll();
      const items = parents.filter(item => parentsIds.indexOf(item.id) > -1);
      const result = orderItemsByIds(items, parentsIds);
      resolve(result);
    });
  }
  // const getUserStatusesByIds = async (userStatusIds) => {
  //   const items = await data.UserStatus.findAll({
  //     where: {
  //       id: {
  //         [Op.in]: userStatusIds,
  //       },
  //     },
  //   });
  //   const result = orderItemsByIds(items, userStatusIds);
  //   return result;
  // },
  return {
    parentsByIds: new DataLoader(getParentsByIds),
    // userStatusesByIds: new DataLoader(getUserStatusesByIds),
  };
};

/* eslint-enable arrow-parens */
/* eslint-enable arrow-body-style */

