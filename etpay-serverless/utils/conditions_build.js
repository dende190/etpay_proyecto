'use strict';

const BEGIN_WITH = 'begins_with';

module.exports.conditionsBuild = {
  update: (attributeValues) => {
    let updateExpressions = [];
    let expressionAttributeValues = {};
    for (let attribute in attributeValues) {
      updateExpressions.push(`${attribute} = :${attribute}`);
      expressionAttributeValues[`:${attribute}`] = attributeValues[attribute];
    }

    return {
      updateExpressions: updateExpressions,
      expressionAttributeValues: expressionAttributeValues,
    };
  },
  query: (conditions) => {
    let filterExpression = '';
    let expressionAttributeValues = {};
    (
      conditions
      .forEach(
        (condition, index) => {
          let operatorLogic = condition[0];
          if (index) {
            filterExpression += `${operatorLogic} `;
          }

          let field = condition[1];
          let value = condition[2];
          let operator = (condition[3] || '=').toLowerCase();
          if (operator === BEGIN_WITH) {
            filterExpression += `${BEGIN_WITH}(${field}, :${index}) `;
            expressionAttributeValues[`:${index}`] = value;
            return;
          }

          filterExpression += (field + ' ');
          if (value === undefined) {
            return;
          }

          filterExpression += `${operator} :${index} `;
          expressionAttributeValues[`:${index}`] = value;
        }
      )
    );

    return {
      filterExpression: filterExpression,
      expressionAttributeValues: expressionAttributeValues,
    };
  },
}
