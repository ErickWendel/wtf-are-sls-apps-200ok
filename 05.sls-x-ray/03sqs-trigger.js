'use strict';
const example = async event => {
  console.log('EVENT**', JSON.stringify(event));
  const data = event.Records.map(item => JSON.parse(item.body));
  console.log('data.length', data.length);
  data.forEach(({ id, nome, data_nasc }) => {
    console.log(
      `
    Id: ${id},
    Nome: ${nome},
    Data Nascimento: ${data_nasc}
  `,
    );
  });

  return {
    statusCode: 200,
  };
};

module.exports = {
  example,
};
