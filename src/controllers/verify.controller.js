import verifyService from "../services/verify.service.js";

class VerifyController {
  async verify(req, res, next) {
    try {
      const result = await verifyService.verifyChain();

      if (result.status === "FAIL") {
        return res.status(409).json(result);
      }

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new VerifyController();