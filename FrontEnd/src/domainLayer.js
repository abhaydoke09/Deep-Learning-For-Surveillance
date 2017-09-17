export const getJsonData = (fileName) => {
  const data = require(`./staticData/${fileName}.json`);
  const listifiedData = listifyObject(data);
  const chunkifiedList =  chunkifyList(listifiedData);
  return reducedList(chunkifiedList);
};

const listifyObject = (dictList) => Object.keys(dictList)
  .map(key => dictList[key]);

const chunkifyList = (list) => {
  const res = [];
  const size = 10;
  while (list.length > 0)
    res.push(list.splice(0, size));
  return res;
};

const reducedList = (list) => list.map(instance => reduceInstance(instance));

const reduceInstance = (instance) => instance.reduce((tot, cur) => {

    const aggregateToPeople = (obj) => obj.person || 0;

    return {
      motion: (parseInt(tot.motion) + parseInt(cur.motion)) / 2,
      bagUnattended: (parseInt(tot.bagUnattended) + parseInt(cur.unattended_count)) / 2,
      peopleCount: tot.peopleCount + aggregateToPeople(cur.class_count) / 2
    }
  },
  {
    bagUnattended: 0,
    motion: 0,
    peopleCount: 0
  });