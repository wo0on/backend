const express = require('express');
const authMiddleware = require('../middleware/auth');
const AccountModel = require('../models/account');

const router = express.Router();

class BankDB {
    static _inst_;
    static getInst = () => {
        if ( !BankDB._inst_ ) BankDB._inst_ = new BankDB();
        return BankDB._inst_;
    }

    #total = 10000;

    constructor() { console.log("[Bank-DB] DB Init Completed"); }

    getBalance = async(item) => {
        const { name, pwd } = item;
        const res = await AccountModel.findOne({Name: name, Pwd:pwd});
        return { success: true, data: res.Total };
    }

    transaction = async( item ) => {
        const { name, pwd, amount } = item;
        
            const taget=await AccountModel.findOne({Name:name, Pwd:pwd});
            const res =await AccountModel.updateOne({Name: name, Pwd:pwd},{ $set: { Total: taget.Total+amount }});
        
        return { success: true, data: res.Total };
    }
}

const bankDBInst = BankDB.getInst();

router.post('/getInfo', authMiddleware, async(req, res) => {
    try {
        const { success, data } =await bankDBInst.getBalance({name: req.body.name, pwd: req.body.pwd});
        if (success) return res.status(200).json({ balance: data });
        else return res.status(500).json({ error: data });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/transaction', authMiddleware, async(req, res) => {
    try {
        const { name, pwd, amount } = req.body;
        const { success, data } = await bankDBInst.transaction( { name: name, pwd: pwd, amount: parseInt(amount)} );
        if (success) res.status(200).json({ success: true, balance: data, msg: "Transaction success" });
        else res.status(500).json({ error: data })
    } catch (e) {
        return res.status(500).json({ error: e });
    }
})

module.exports = router;