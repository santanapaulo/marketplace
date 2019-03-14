const Ad = require('../models/Ad');
const User = require('../models/User');
const jobs = require('../jobs');

const Queue = require('../services/Queue');

class PurchaseController {
  async store(req, res) {
    const { ad, content } = req.body;

    const purchaseAd = await Ad.findById(ad).populate('author');
    const user = await User.findById(req.userId);

    Queue.create(jobs.PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save();
    return res.json({});
  }
}

module.exports = new PurchaseController();
