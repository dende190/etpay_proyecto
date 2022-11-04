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
const regexDateDDMMYYYY = (
  /^([1-9]|[012][0-9]|3[01])[-|\/]([0]{0,1}[1-9]|1[012])[-|\/](\d\d\d\d) (([012]{0,1}[0-9]):([0-6][0-9]):*(([0-9]{0,2})(\.\d+)*))$/
);

const transformData = {
  init: (transactionsData) => {
    for (let transactionProperty in transactionsData) {
      if (fieldsDates.includes(transactionProperty)) {
        transactionsData[transactionProperty] = (
          transformData
          .dateToTimestamp(transactionsData[transactionProperty])
        );
      }

      let translate = transformData.translateToEnglish(transactionProperty);
      if (translate) {
        transactionsData[translate] = transactionsData[transactionProperty];
        delete transactionsData[transactionProperty];
      }
    }

    return transactionsData;
  },
  translateToEnglish: (transactionProperty) => {
    return (translateOptions[transactionProperty] || '');
  },
  dateToTimestamp: (transactionDate) => {
    if (typeof transactionDate === 'number') {
      return new Date(transactionDate).getTime();
    }

    const dateMatch = transactionDate.match(regexDateDDMMYYYY);
    if (!dateMatch) {
      return new Date(transactionDate).getTime();
    }

    const year = dateMatch[3];
    const month = dateMatch[2];
    const day = dateMatch[1];
    const hour = dateMatch[4];
    return new Date(`${dateMatch[3]}/${month}/${day} ${hour}`).getTime()
  },
}

module.exports = {
  transformData,
};
