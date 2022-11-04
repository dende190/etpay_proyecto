'use strict';

const translateOptions = {
  monto: 'amount',
  tipo: 'type',
  fechaMovimiento: 'transactionDate',
  fecha: 'date',
};
const fieldsDates = [
  'validatedAt',
  'createdAt',
  'updatedAt',
  'transactionDate',
  'fechaMovimiento',
  'date',
  'fecha',
];

const moment = require('moment');

const transformData = {
  init: (transactionsData) => {
    for (let transactionProperty in transactionsData) {
      let transactionValue = transactionsData[transactionProperty];
      if (fieldsDates.includes(transactionProperty)) {
        transactionsData[transactionProperty] = (
          transformData
          .dateToTimestamp(transactionValue)
        );
      }

      let translate = transformData.translateToEnglish(transactionProperty);
      if (translate) {
        transactionsData[translate] = transactionValue;
        delete transactionsData[transactionProperty];
      }
    }

    return transactionsData;
  },
  translateToEnglish: (transactionProperty) => {
    return (translateOptions[transactionProperty] || '');
  },
  dateToTimestamp: (transactionDate) => {
    return moment(transactionDate).unix();
  },
}

module.exports = {
  transformData,
};
