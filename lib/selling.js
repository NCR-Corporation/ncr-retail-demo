import sendRequest from './sendRequest';

// const baseUrl = `https://gateway-staging.ncrcloud.com/emerald/selling-service/v1/carts`;
const baseUrl = `https://gateway-staging.ncrcloud.com/emerald/selling-service/v1.0.1/carts`;

export async function createTaxAuthority() {
  return await sendRequest(`${baseUrl}`);
}

export async function createTaxRate() {}

export async function createTender() {}
