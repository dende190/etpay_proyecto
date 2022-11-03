'use strict';

module.exports.queryBuild = {
  generateCondition: (attributeValues) => {
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
}
