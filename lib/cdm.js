import sendRequest from './sendRequest';

const baseUrl = `https://ncrstag-stag.apigee.net/cdm`;

export async function findConsumer(emailAddress) {
  let searchCriteria = {
    searchCriteria: { emailAddress: emailAddress },
    operator: 'AND',
    pageStart: 0,
    pageSize: 1
  };
  return await sendRequest(`${baseUrl}/consumers/find`, 'POST', searchCriteria);
}

export async function createConsumer(consumer) {
  // let createdConsumer = await sendRequest(
  //   `${baseUrl}/consumers`,
  //   'POST',
  //   consumer.consumerProfile
  // );
  // let CAN = createdConsumer.data.consumerAcccountNumber;
  // consumer.consumerProfile.consumerAcccountNumber = CAN;
  // consumer.consumerProfile.identifiers =
  //   consumer.consumerProfile.identifiersData; // This is dumb.
  // delete consumer.consumerProfile.identifiersData;
  // console.log(consumer);

  return await sendRequest('http://ncrstag-stag.apigee.net/provisioning/services/rest/users', 'POST', consumer);
}
