const { VoucherSale, Voucher, User } = require("../model/model");


const voucherController = {
    //ADD Place
    addVoucherToSale: async (req, res) => {
        try {
            let data = req.body;
            const newVoucher = new VoucherSale(data);
            const saveVoucher = await newVoucher.save();
            return res.status(200).json(saveVoucher);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    saleVoucher: async (req, res) => {
        try {
            const user = req.user.id;
            const voucherDetail = req.body.voucherDetail;
            const trHash = req.body.trHash;

            // Check if the VoucherSale exists and has available vouchers
            const voucherSale = await VoucherSale.findById(voucherDetail);
            if (!voucherSale) {
                return res.status(404).json({ error: 'VoucherSale not found.' });
            }
            if (voucherSale.number <= 0) {
                return res.status(400).json({ error: 'No available vouchers for this VoucherSale.' });
            }

            // Create a new Voucher and save it to the database
            const data = {
                user: user,
                detail: voucherDetail,
                trHash: trHash
            };
            const newVoucher = new Voucher(data);
            const savedVoucher = await newVoucher.save();

            // Add the newly created Voucher's ObjectId to the user's vouchers field
            await User.findByIdAndUpdate(user, { $push: { vouchers: savedVoucher._id } });

            // Decrease the number of available vouchers for the VoucherSale
            voucherSale.number--;
            await voucherSale.save();

            return res.status(200).json(savedVoucher);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getAllVoucherSale: async (req, res) => {
        try {
            const vouchers = await VoucherSale.find();
            return res.status(200).json(vouchers);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    checkVoucher: async (req, res) => {
        try {
            const voucher = await VoucherSale.findById(req.body.id);
            if (voucher && voucher.number <=0) {
                return res.status(500).json("Không còn voucher")
            }
            else {
                return res.status(200).json("Còn voucher")
            }
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = voucherController;