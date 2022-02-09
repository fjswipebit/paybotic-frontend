import axios from "axios";

class SilaMoneyService {
  async createSilaMerchant() {}
  async requestKYC(userHandle, id) {
    const request = {
      method: "POST",
      url: `${process.env.VUE_APP_SILAMONEY_URL}/entities/${userHandle}/request-kyc`,
      data: {},
    };

    let result;

    try {
      result = await axios(request);

      // console.log("KYC Request", result.data.result.data);
      await this.savePendingKYC({
        txId: result.data.result.data.verification_uuid,
        merchantId: id,
        userHandle: userHandle,
      });
    } catch (SilaError) {
      throw new Error(SilaError);
    }
    return result.data.result.data;
  }

  async savePendingKYC(data) {
    const request = {
      method: "POST",
      url: `${process.env.VUE_APP_LOAN_SETTLEMENT_WORKER}/dev/kyc-details/save`,
      data,
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };

    let result;

    try {
      result = await axios(request);
      console.log(result);
    } catch (ServerlessError) {
      console.log(ServerlessError);
    }
  }
}
export default new SilaMoneyService();
